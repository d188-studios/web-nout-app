import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import EditorJS, { API, OutputBlockData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './editorTools';
import { useParams } from 'react-router-dom';
import { usePages } from '~/features/editor/stores/pages';
import { axios } from '~/lib/axios';
import { Content } from '~/features/editor/types';
import { Status } from './Status';
import { Either } from '~/utils/Either';
import { useIsMobile } from '~/features/editor/hooks/useIsMobile';

// TODO: Refactor this component.

export interface EditorProps {}

export function Main(props: EditorProps) {
  const { selectedPageId } = useParams();
  const { findPage, loading: loadingPages } = usePages();

  const selectedPage = useMemo(() => {
    if (!selectedPageId) return null;

    return findPage(selectedPageId);
  }, [findPage, selectedPageId]);

  const [fetchError, setFetchError] = React.useState<Error | null>(null);
  // TODO: Handle save error.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saveError, setSaveError] = React.useState<Error | null>(null);
  const [loadingContent, setLoadingContent] = React.useState(true);
  const [ready, setReady] = React.useState(false);

  const loading = loadingContent || loadingPages;
  const editorVisible = !loading && !fetchError && ready && selectedPage;

  const noPageSelected = selectedPageId === undefined;
  const noPageFound = selectedPage === null;

  const editorRef = useRef<EditorJS | null>(null);
  const editor = editorRef.current;
  const holderRef = useRef<HTMLDivElement | null>(null);

  const mobile = useIsMobile(650);

  const saveBlocks = useCallback(
    async (pageId: string, blocks: OutputBlockData[]) => {
      try {
        const res = await axios.put<Content>(`/content/${pageId}`, {
          content: blocks,
        });

        return Either.right<Error, Content['content']>(res.data.content);
      } catch (e) {
        return Either.left<Error, Content['content']>(e as Error);
      }
    },
    []
  );

  const fetchBlocks = useCallback(async (pageId: string) => {
    try {
      const res = await axios.get<Content>(`/content/${pageId}`);

      return Either.right<Error, Content['content']>(res.data.content);
    } catch (e) {
      return Either.left<Error, Content['content']>(e as Error);
    }
  }, []);

  const renderSelectedPageBlocks = useCallback(async () => {
    if (!editor || !ready) return;

    setLoadingContent(true);

    if (selectedPageId) {
      const either = await fetchBlocks(selectedPageId);

      either.fold(
        (e) => {
          setFetchError(e);
        },
        (blocks) => {
          setFetchError(null);
          editor.render({
            blocks,
          });
        }
      );

      // @ts-ignore
      editor.configuration.onChange = async (api: API) => {
        const { blocks } = await api.saver.save();

        // Don't wait for the save to finish.
        saveBlocks(selectedPageId, blocks).then((either) =>
          either.fold(
            (e) => {
              setSaveError(e);
            },
            () => {
              setSaveError(null);
            }
          )
        );
      };
    }

    setLoadingContent(false);
  }, [editor, fetchBlocks, ready, saveBlocks, selectedPageId]);

  useLayoutEffect(() => {
    if (editorRef.current) return;

    editorRef.current = holderRef.current
      ? new EditorJS({
          holder: holderRef.current,
          tools: EDITOR_JS_TOOLS,
        })
      : null;

    editorRef.current?.isReady.then(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    renderSelectedPageBlocks();
  }, [renderSelectedPageBlocks]);

  return (
    <div className="flex-1 relative">
      <div
        className="absolute inset-0 overflow-auto"
        style={{
          // !!Editor cannot be unmounted if it is not visible.
          visibility: editorVisible ? 'visible' : 'hidden',
          paddingLeft: mobile ? '1.8rem' : '5rem',
          paddingRight: mobile ? '1.8rem' : '5rem',
          paddingTop: mobile ? 0 : '4rem',
          paddingBottom: mobile ? 0 : '4rem',
        }}
        ref={holderRef}
      />

      <Status
        loading={loading}
        fetchError={fetchError}
        noPageSelected={noPageSelected}
        noPageFound={noPageFound}
        onRefresh={renderSelectedPageBlocks}
      />
    </div>
  );
}
