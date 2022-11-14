import { Form, Modal, Rate, Select, Typography } from 'antd';
import { useState } from 'react';
import { User } from '~/features/auth';
import { axios } from '~/lib/axios';
import interpolate from 'color-interpolate';

const interpolateColor = interpolate(['red', '#d1c936', 'green']);

export interface UserSatisfactionSurveyProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UserSatisfactionSurvey({
  onClose,
  onSuccess,
  ...props
}: UserSatisfactionSurveyProps) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    promedio_calificacion: number;
    resultado_calificacion: string;
  } | null>(null);

  const onSend = async () => {
    setLoading(true);

    try {
      const body = await form.validateFields();

      const res = await axios.post('/survey', body);
      setData(res.data);

      onSuccess();
    } catch (e) {
      setData(null);
    }

    setLoading(false);
  };

  const onCancel = () => {
    form.resetFields();
    setData(null);
    onClose();
  };

  return (
    <Modal
      {...props}
      title={
        data
          ? 'Resultado encuesta de satisfacción de usuario'
          : 'Encuesta de satisfacción de usuario'
      }
      onCancel={onCancel}
      cancelText="Cerrar"
      okText="Enviar"
      onOk={onSend}
      width={800}
      footer={data ? null : undefined}
      cancelButtonProps={{
        disabled: loading,
      }}
      closable={!loading}
      confirmLoading={loading}
      maskClosable={!loading}
      destroyOnClose
    >
      {data ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              height: 180,
              width: 180,
              borderRadius: 60,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: interpolateColor(data.promedio_calificacion / 5),
              marginBottom: 20
            }}
          >
            <Typography.Text
              style={{ color: 'white', fontSize: 80, fontWeight: 'bold' }}
            >
              {data.promedio_calificacion.toFixed(1)}
            </Typography.Text>
          </div>
          <Typography.Title>{data.resultado_calificacion}</Typography.Title>
        </div>
      ) : (
        <Form
          form={form}
          initialValues={{
            profesion: 'Alumno',
            visualScore: 0,
            UXscore: 0,
            utilityScore: 0,
          }}
        >
          <Form.Item
            name="profesion"
            label="Profesión"
            rules={[{ required: true }]}
          >
            <Select placeholder="Selecciona una profesión" allowClear>
              <Select.Option value="Alumno">Alumno</Select.Option>
              <Select.Option value="Maestro">Maestro</Select.Option>
              <Select.Option value="Otro">Otro</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="visualScore"
            label="Calificación diseño visual"
            rules={[{ required: true }]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item
            name="UXscore"
            label="Calificación experiencia de usuario"
            rules={[{ required: true }]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item
            name="utilityScore"
            label="Calificación utilidad de la aplicacion"
            rules={[{ required: true }]}
            style={{ marginBottom: 0 }}
          >
            <Rate allowHalf />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
