import tls from "tls";
import net from "net";

const socket = tls.connect(6543, "aws-0-ap-northeast-1.pooler.supabase.com", { rejectUnauthorized: false }, () => {
  console.log("TLS handshake succeeded directly on port 6543!");
  socket.end();
});

socket.on("error", (err) => {
  console.log("Direct TLS error:", err.message);
});
