import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import EditorJS, { API, OutputBlockData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './editorTools';
import { useUpdateEffect } from 'react-use';
import { useParams } from 'react-router-dom';
import { usePages } from '~/features/editor/stores/pages';
import { Button, Empty, Result, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEventEmitter } from '~/lib/eventemitter';

export interface EditorProps {}

export function Main(props: EditorProps) {
  const { selectedPageId } = useParams();
  const { findPage, loading } = usePages();
  const { emit } = useEventEmitter();

  const selectedPage = useMemo(() => {
    if (!selectedPageId) return null;

    return findPage(selectedPageId);
  }, [findPage, selectedPageId]);

  const noPageSelected = !loading && selectedPageId === undefined;
  const noPageFound = !loading && !noPageSelected && selectedPage === null;

  const editorRef = useRef<EditorJS | null>(null);
  const editor = editorRef.current;
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);
  const [blocks, setBlocks] = React.useState<OutputBlockData[]>([]);

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
    // if (selectedPageId === undefined || !editor) return;
    // // @ts-ignore
    // if (editor.configuration !== undefined)
    //   // @ts-ignore
    //   editor.configuration.onChange = async (api: API) => {
    //     const { blocks } = await api.saver.save();
    //     // TODO: Save blocks to server.
    //     setBlocks((prevBlocks) => {
    //       if (JSON.stringify(prevBlocks) === JSON.stringify(blocks))
    //         return prevBlocks;
    //       return blocks;
    //     });
    //   };
    // // TODO: Fetch blocks from server.
    // editor.clear();
    // setBlocks((prevBlocks) => {
    //   if (prevBlocks.length > 0) return [];
    //   return prevBlocks;
    // });
  }, [editor, selectedPageId]);

  // useUpdateEffect(() => {
  //   console.log(blocks);
  // }, [blocks]);

  return (
    <div className="flex-1 relative">
      <div
        style={{
          visibility: ready && selectedPage ? 'visible' : 'hidden',
        }}
        ref={holderRef}
        className="absolute inset-0 overflow-auto p-20"
      />

      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-auto">
          <Spin size="large" />
        </div>
      ) : null}

      {noPageSelected ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-auto">
          <Empty
            description="Crea o selecciona una página para editar."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button
              onClick={() => {
                emit('openAddPageDialog');
              }}
              icon={<PlusOutlined />}
              type="primary"
            >
              Nueva página
            </Button>
          </Empty>
        </div>
      ) : null}

      {noPageFound ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-auto">
          <Result
            status="404"
            title="404"
            subTitle="No se encontró la página."
            extra={
              <Button
                onClick={() => {
                  emit('openAddPageDialog');
                }}
                icon={<PlusOutlined />}
                type="primary"
              >
                Nueva página
              </Button>
            }
          />
        </div>
      ) : null}
    </div>
  );
}
