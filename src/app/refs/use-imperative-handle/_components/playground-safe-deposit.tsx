"use client";

import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

type SafeBoxHandle = {
  open: () => void;
  close: () => void;
  store: (item: string) => void;
  getCount: () => number;
};

const ITEMS = [
  "Gold Bar",
  "Diamond Ring",
  "Stock Certificate",
  "Property Deed",
  "Rare Coin",
  "Family Heirloom",
];

const SafeDepositBox = forwardRef<SafeBoxHandle>(function SafeDepositBox(
  _props,
  ref
) {
  const [isLocked, setIsLocked] = useState(true);
  const [items, setItems] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lockBox = useCallback(() => {
    setIsLocked(true);
    setTimeLeft(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    open() {
      setIsLocked(false);
      setTimeLeft(5);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            lockBox();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    close() {
      lockBox();
    },
    store(item: string) {
      if (!isLocked) {
        setItems((prev) => [...prev, item]);
      }
    },
    getCount() {
      return items.length;
    },
  }));

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="rounded-lg bg-muted/50 p-4 space-y-3">
      <p className="text-xs text-muted-foreground font-medium">
        Internal component state:
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Lock status</p>
          <Badge
            variant="outline"
            className={
              isLocked
                ? "border-red-500/30 text-red-500"
                : "border-green-500/30 text-green-500"
            }
          >
            {isLocked ? "Locked" : "Unlocked"}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Items stored</p>
          <p className="text-lg font-bold font-mono">{items.length}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Auto-lock timer</p>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-1000"
              style={{ width: `${(timeLeft / 5) * 100}%` }}
            />
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            {timeLeft > 0 ? `${timeLeft}s` : "—"}
          </p>
        </div>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {items.map((item, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
});

const safeCode = `const SafeDepositBox = forwardRef((props, ref) => {
  const [isLocked, setIsLocked] = useState(true);
  const [items, setItems] = useState([]);

  useImperativeHandle(ref, () => ({
    open()  { setIsLocked(false); /* start auto-lock */ },
    close() { setIsLocked(true); },
    store(item) {
      if (!isLocked) setItems(prev => [...prev, item]);
    },
    getCount() { return items.length; },
  }));

  // Parent CANNOT access isLocked, items, or timer
  return <div>...</div>;
});`;

export function PlaygroundSafeDeposit() {
  const boxRef = useRef<SafeBoxHandle>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const itemIndex = useRef(0);

  function handleOpen() {
    boxRef.current?.open();
  }

  function handleClose() {
    boxRef.current?.close();
  }

  function handleStore() {
    const item = ITEMS[itemIndex.current % ITEMS.length];
    itemIndex.current++;
    boxRef.current?.store(item);
  }

  function handleCount() {
    const count = boxRef.current?.getCount() ?? 0;
    setDisplayCount(count);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="lock">
            🔐
          </span>
          Safe Deposit Box
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Imperative API
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SafeDepositBox ref={boxRef} />

        <div className="space-y-2">
          <p className="text-sm font-medium">Parent controls (via ref):</p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleOpen}>
              Open Box
            </Button>
            <Button variant="outline" size="sm" onClick={handleClose}>
              Close Box
            </Button>
            <Button variant="outline" size="sm" onClick={handleStore}>
              Store Item
            </Button>
            <Button variant="outline" size="sm" onClick={handleCount}>
              Count Items
            </Button>
          </div>
          {displayCount > 0 && (
            <p className="text-xs font-mono text-muted-foreground">
              getCount() returned: {displayCount}
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          The parent can only call open, close, store, and getCount. It cannot
          access the internal lock mechanism, timer state, or stored items
          directly.
        </p>

        <CodeBlock code={safeCode} filename="safe-deposit-box.tsx" />
      </CardContent>
    </Card>
  );
}
