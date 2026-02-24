"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ExampleClassBinding } from "./_components/example-class-binding";
import { ExampleHooksSolution } from "./_components/example-hooks-solution";

const classCode = `class SearchBar extends React.Component {
  state = { query: "" };

  // Must bind or use arrow — otherwise 'this' is lost
  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.query} onChange={this.handleChange} />
      </form>
    );
  }
}`;

const hooksCode = `function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Arrow function — no this needed
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
    </form>
  );
}`;

const eventPatternCode = `function TodoList() {
  const [todos, setTodos] = useState([]);

  // Arrow functions capture state via closures
  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  };

  // Inline arrows are fine for simple handlers
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}`;

export default function ThisInReactPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">this in React</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Class components made this a constant headache. Hooks and arrow
          functions eliminated the problem entirely — here&apos;s how and why.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Class Component Problem</h2>
          <p className="text-muted-foreground">
            In class components, event handlers are detached methods — passed as
            callbacks, they lose their{" "}
            <code className="text-foreground">this</code> binding. Every developer
            has hit this bug at least once:
          </p>
          <ExampleClassBinding />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Hooks Solution</h2>
          <p className="text-muted-foreground">
            Function components with hooks don&apos;t use{" "}
            <code className="text-foreground">this</code> at all. State lives in
            closures, and arrow functions just work:
          </p>
          <ExampleHooksSolution />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Side by Side</h2>
          <p className="text-muted-foreground">
            The same component — class vs hooks. Notice how much{" "}
            <code className="text-foreground">this</code> disappears:
          </p>
          <CodeBlock code={classCode} filename="SearchBar-class.jsx" />
          <CodeBlock code={hooksCode} filename="SearchBar-hooks.jsx" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Modern Event Handler Patterns</h2>
          <p className="text-muted-foreground">
            In modern React, arrow functions and closures handle everything{" "}
            <code className="text-foreground">this</code> used to do:
          </p>
          <CodeBlock code={eventPatternCode} filename="event-patterns.jsx" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              Class components required manual{" "}
              <code className="text-foreground">this</code> binding for every
              handler
            </li>
            <li>
              Arrow class fields and constructor{" "}
              <code className="text-foreground">bind</code> were the two main
              fixes
            </li>
            <li>
              <strong>Hooks eliminated this entirely</strong> — function
              components don&apos;t have{" "}
              <code className="text-foreground">this</code>
            </li>
            <li>
              Arrow functions + closures give event handlers natural access to
              state and props
            </li>
            <li>
              This is a major reason React moved from classes to hooks
            </li>
          </ul>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
