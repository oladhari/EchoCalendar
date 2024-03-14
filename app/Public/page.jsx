import { getServerSession } from "next-auth/next";
import { google } from "googleapis";
import { options } from "../api/auth/[...nextauth]/options";
const Public = async () => {
  const session = await getServerSession(options);
  const user = session?.user;
  console.log(session);

  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_Secret,
    // GCPコンソールで設定したredirect URI
    redirectUri: "http://localhost:3000/google-calendar",
  });
  console.log(oauth2Client);
  // const accessToken = user?.accessToken; // Googleが払い出したアクセストークン
  // console.log(accessToken);
  // if (!accessToken) {
  //   return <div>accessToken is null</div>;
  // }

  // トークンを設定。refresh_tokenも渡せます。
  // oauth2Client.setCredentials({ access_token: accessToken });
  oauth2Client.setCredentials({
    access_token: user?.accessToken,
  });

  // カレンダーオブジェクト作成
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  console.log(events);

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>{event.summary}</div>
      ))}
      {/* <div>よしなにレンダリング。{{ events }}</div> */}
    </div>
  );
};

export default Public;
