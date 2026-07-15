import crypto from "node:crypto";

export default function handler(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({
      success: false,
      error: "Missing q parameter"
    });
  }

  try {
    const key = "qwertyuioplkjhgf";
    const cipher = crypto.createCipheriv("aes-128-ecb", key, null);

    const token =
      cipher.update(q, "utf8", "hex") +
      cipher.final("hex");

    res.json({
      success: true,
      token
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message
    });
  }
}
