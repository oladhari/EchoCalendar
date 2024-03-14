import { google } from "googleapis";
import { useSession } from "next-auth/react";
const CalendarEvents = () => {
  // サーバ・コンポーネントでセッションを取得する。
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  const user = session?.user;

  // Google OAuthへの接続
  //   const oauth2Client = new google.auth.OAuth2({
  //     clientId: process.env.GOOGLE_ID,
  //     clientSecret: process.env.GOOGLE_Secret,
  //     // GCPコンソールで設定したredirect URI
  //     redirectUri: "http://localhost:3000/google-calendar",
  //   });

  const accessToken = user?.accessToken; // Googleが払い出したアクセストークン
  console.log(accessToken);
  //   if (!accessToken) {
  //     return <div>accessToken is null</div>;
  //   }

  //   // トークンを設定。refresh_tokenも渡せます。
  //   oauth2Client.setCredentials({ access_token: accessToken });

  //   // カレンダーオブジェクト作成
  //   const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  //   // カレンダー一覧を取得
  //   const calendarResponse = calendar.calendarList.list();

  //   console.log(calendarResponse.data);

  return (
    <div>
      <div>よしなにレンダリング。calendarResponse.data</div>
    </div>
  );
};
export default CalendarEvents;
