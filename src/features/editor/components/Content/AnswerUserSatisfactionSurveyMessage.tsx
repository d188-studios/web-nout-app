import { Alert, Button, Space } from 'antd';
import { useState } from 'react';
import { User } from '~/features/auth';
import { UserSatisfactionSurvey } from '~/features/surveys';

export interface AnswerUserSatisfactionSurveyMessageProps {
  user: User;
}

export function AnswerUserSatisfactionSurveyMessage({
  user,
}: AnswerUserSatisfactionSurveyMessageProps) {
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(user.survey);

  return (
    <>
      {success ? null : (
        <Alert
          className="border-0"
          message="Contesta la encuesta de satisfacción de usuario."
          type="info"
          action={
            <Space>
              <Button
                onClick={() => setVisible(true)}
                size="small"
                type="ghost"
              >
                Contestar
              </Button>
            </Space>
          }
        />
      )}

      <UserSatisfactionSurvey
        onSuccess={() => {
          setSuccess(true);
        }}
        onClose={() => setVisible(false)}
        visible={visible}
      />
    </>
  );
}
