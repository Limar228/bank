const path = require("path");
const jwt = require("jsonwebtoken");
const serviceUsers = require("../service/serviceUsers");
const serviceToken = require("../service/serviceToken");

async function checkTokens(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    return next();
  }
  if (!refreshToken) {
    return next();
  }

  try {
    const valueCheckTokens = await serviceToken.checkingTokens(
      accessToken,
      refreshToken,
    );

    res.cookie("accessToken", valueCheckTokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", valueCheckTokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    req.cookies.accessToken = valueCheckTokens.accessToken;
    return next();
  } catch (err) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    console.log(err);
    return res.status(403).json({
      success: false,
      message: "Время действия сессии истекло.",
    });
  }
}

module.exports = checkTokens;
