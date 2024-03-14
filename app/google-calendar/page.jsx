import { calendar_v3, google } from "googleapis";

import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Page() {
  // サーバ・コンポーネントでセッションを取得する。
  const session = await getServerSession(options);
  const user = session?.user;

  // Google OAuthへの接続
  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_Secret,
    // GCPコンソールで設定したredirect URI
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  });

  const accessToken = user?.accessToken; // Googleが払い出したアクセストークン
  if (!accessToken) {
    return <div>accessToken is null</div>;
  }

  // トークンを設定。refresh_tokenも渡せます。
  oauth2Client.setCredentials({ access_token: accessToken });

  // カレンダーオブジェクト作成
  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  // カレンダー一覧を取得
  const calendarResponse = await calendar.calendarList.list();

  console.log(calendarResponse.data);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <div>よしなにレンダリング。calendarResponse.data</div>
      </div>
    </main>
  );
}
