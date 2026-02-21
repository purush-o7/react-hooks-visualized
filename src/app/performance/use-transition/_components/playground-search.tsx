"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home", "Sports", "Toys", "Food", "Beauty"];
const ADJECTIVES = ["Premium", "Deluxe", "Basic", "Pro", "Ultra", "Mini", "Mega", "Super"];

const PRODUCTS = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `${ADJECTIVES[i % ADJECTIVES.length]} ${CATEGORIES[i % CATEGORIES.length]} Item #${i}`,
  price: ((i * 7 + 3) % 200) + 5,
  category: CATEGORIES[i % CATEGORIES.length],
}));

const code = `const [query, setQuery] = useState("");
const [searchQuery, setSearchQuery] = useState("");
const [isPending, startTransition] = useTransition();

function handleSearch(value: string) {
  setQuery(value);  // instant input update
  startTransition(() => {
    setSearchQuery(value);  // deferred search
  });
}

// isPending? Fade the grid while results catch up.`;

export function PlaygroundSearch() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [counter, setCounter] = useState(0);

  function handleSearch(value: string) {
    setQuery(value);
    startTransition(() => {
      setSearchQuery(value);
    });
  }

  const results = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const display = results.slice(0, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Live Product Search
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            5,000 Products
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-mono text-xs">
            {results.length.toLocaleString()} results
          </Badge>
          {isPending && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-600 font-mono text-xs animate-pulse">
              Searching...
            </Badge>
          )}
        </div>

        <div
          className="rounded-lg bg-muted/50 p-3 max-h-[250px] overflow-y-auto transition-opacity duration-200"
          style={{ opacity: isPending ? 0.5 : 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {display.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between px-3 py-2 rounded bg-background/50 text-sm"
              >
                <span className="truncate text-xs">{product.name}</span>
                <span className="font-mono text-xs text-muted-foreground ml-2">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
          {results.length > 100 && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              ...and {(results.length - 100).toLocaleString()} more
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Counter: {counter}
          </Button>
          <span className="text-xs text-green-600">
            {counter > 0 ? "Still responsive during search!" : "Click during a search to test responsiveness"}
          </span>
        </div>

        <CodeBlock code={code} filename="live-search.tsx" />
      </CardContent>
    </Card>
  );
}
