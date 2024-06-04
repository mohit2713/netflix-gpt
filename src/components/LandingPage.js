import React from "react";
import BackLogo from "./BackLogo";
import LoginPage from "./LoginPage";

const LandingPage = () => {
  return (
    <div className="sm: w-100% h-[950px] bg-black">
      <LoginPage />
      <BackLogo />
    </div>
  );
};

export default LandingPage;
