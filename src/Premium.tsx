import {
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  getUserId,
  removeUserId,
} from "./storage";
import { getIsUserActive } from "./api";
import { useEffect, useState } from "react";

const checkoutUrlParams = new URLSearchParams();

checkoutUrlParams.set("product", "Test product");
checkoutUrlParams.set("token", "USDT");
checkoutUrlParams.set("amount", "1");
checkoutUrlParams.set("period", "30d");
checkoutUrlParams.set("chains", "sepolia");
checkoutUrlParams.set("domain", "paybeaver.xyz");
checkoutUrlParams.set(
  "onSuccessUrl",
  "https://simple-merchant.paybeaver.xyz/success"
);
checkoutUrlParams.set("freeTrialLength", "0");

function makeCheckoutUrl(userId: string) {
  checkoutUrlParams.set("userId", userId);

  return `https://gateway.paybeaver.xyz/subscribe?${checkoutUrlParams.toString()}`;
}

// Component with premium content that needs to be purchased.
export function Premium() {
  const navigate = useNavigate();
  const userId = getUserId();
  const [isActive, setIsActive] =
    useState<boolean>();
  const [clickerValue, setClickerValue] =
    useState(0);

  useEffect(() => {
    (async () => {
      if (!userId) return;

      const isActive = await getIsUserActive(
        userId
      );

      setIsActive(isActive);
    })();
  }, [userId]);

  if (!userId) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  if (isActive === undefined)
    return <p>Loading...</p>;

  const onLogOut = () => {
    removeUserId();
    navigate("/login");
  };

  const onSubscribe = () => {
    const checkoutUrl = makeCheckoutUrl(userId);
    window.location.href = checkoutUrl;
  };

  if (isActive === false) {
    return (
      <div>
        <div>
          <p>
            This component is available only to
            premium subscribers. It costs $1 per
            month.
          </p>
          <button onClick={onSubscribe}>
            Subscribe
          </button>
        </div>
        <button
          onClick={onLogOut}
          style={{ marginTop: 16 }}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p style={{ margin: 0, marginTop: 16 }}>
          Woohoooo!!! You have a premium
          subscription! Play this clicker! It's so
          enjoyable ohmygod!!
        </p>
        <p style={{ margin: 0 }}>
          Times clicked: {clickerValue}
        </p>
        <button
          onClick={() =>
            setClickerValue(clickerValue + 1)
          }
        >
          Click!!!
        </button>
      </div>
      <button
        onClick={onLogOut}
        style={{ marginTop: 16 }}
      >
        Log out
      </button>
    </div>
  );
}
