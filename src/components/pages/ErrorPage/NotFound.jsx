import { Button, Result } from "antd";

export const NotFound = () => {
  return (
    <Result
      status="404"
      title="404 Oops! The page you're looking for doesn't exist"
      subTitle="It seems that you have taken a wrong turn. Don't worry... it happens to the best of us."
      extra={
        <div>
          <Button href="/" type="primary" className="text-decoration-none">
            Back Home
          </Button>
        </div>
      }
    />
  );
};
