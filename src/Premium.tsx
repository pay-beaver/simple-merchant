import {
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  getUserId,
  removeUserId,
} from "./storage";
import { Subscription } from "./types";
import { getSubscriptionsByUserId } from "./api";
import { useEffect, useState } from "react";

const checkoutUrlParams = new URLSearchParams();

checkoutUrlParams.set("product", "Test product");
checkoutUrlParams.set("token", "USDT");
checkoutUrlParams.set("amount", "1");
checkoutUrlParams.set("period", "day");
checkoutUrlParams.set("chains", "1,11155111");
checkoutUrlParams.set("domain", "paybeaver.xyz");
checkoutUrlParams.set(
  "onSuccessUrl",
  "https://simple-merchant.paybeaver.xyz/success"
);
checkoutUrlParams.set("freeTrialLength", "0");
checkoutUrlParams.set(
  "paymentPeriod",
  (60 * 60 * 24).toString() // one day
);

function makeCheckoutUrl(userId: string) {
  const subscriptionNonce = Math.floor(
    Math.random() * 1e8
  );

  checkoutUrlParams.set(
    "subscriptionId",
    `${userId}${subscriptionNonce}`
  );

  return `https://gateway.paybeaver.xyz/subscribe?${checkoutUrlParams.toString()}`;
}

// Component with premium content that needs to be purchased.
export function Premium() {
  const navigate = useNavigate();
  const userId = getUserId();
  const [
    latestSubscription,
    setLatestSubscription,
  ] = useState<Subscription | null>();
  const [clickerValue, setClickerValue] =
    useState(0);

  useEffect(() => {
    (async () => {
      if (!userId) return;

      const subscriptions =
        await getSubscriptionsByUserId(userId);

      if (subscriptions.length === 0) {
        setLatestSubscription(null);
        return;
      }

      subscriptions.sort(
        (a, b) =>
          a.startTimestamp - b.startTimestamp
      );
      setLatestSubscription(subscriptions[0]);
    })();
  }, [userId]);

  if (!userId) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  if (latestSubscription === undefined)
    return <p>Loading...</p>;

  const onLogOut = () => {
    removeUserId();
    navigate("/login");
  };

  const onSubscribe = () => {
    const checkoutUrl = makeCheckoutUrl(userId);
    window.location.href = checkoutUrl;
  };

  const userHasAccessComponent = (
    <div>
      <p style={{ margin: 0 }}>
        Subscribed on{" "}
        {new Date(
          latestSubscription!.startTimestamp *
            1000
        ).toLocaleString()}
      </p>
      <p style={{ margin: 0 }}>
        Next payment on{" "}
        {new Date(
          latestSubscription!.nextPaymentAt * 1000
        ).toLocaleString()}
      </p>
      <p style={{ margin: 0, marginTop: 16 }}>
        Woohoooo!!! Play this clicker! It's so
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
  );

  const subscriptionPromptComponent = (
    <div>
      <p>
        This component is available only to
        premium subscribers. It costs $1 per day.
      </p>
      <button onClick={onSubscribe}>
        Subscribe
      </button>
    </div>
  );

  return (
    <div>
      {latestSubscription &&
      latestSubscription.isActive
        ? userHasAccessComponent
        : subscriptionPromptComponent}
      <button
        onClick={onLogOut}
        style={{ marginTop: 16 }}
      >
        Log out
      </button>
    </div>
  );
}
