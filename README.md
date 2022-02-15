# Emoji Captcha react client library

Easily integrate emoji captcha in your react apps

![emoji captcha demo](https://user-images.githubusercontent.com/23727670/153011705-020be005-a1ab-4d1c-9ec3-4c6ed9def762.gif)

## React Client Installation

Install emoji-captcha with npm

```bash
  npm install @emoji-captcha/react
```

Install emoji-captcha with yarn

```bash
  yarn add @emoji-captcha/react
```

## Usage

Somewhere in your forms

```javascript
import EmojiCaptcha from "@emoji-captcha/react";

const emojiRes = fetch("somewhere from the earth/emoji-captcha");
// if you are using SSR you can directly put the emoji captcha res

const App = () => {
  const [selectedIdx, setSelectedIdx] = (useState < number) | (null > null);
  return (
    <div>
      <h2>Emoji captcha React component demo</h2>
      <EmojiCaptcha
        onSelect={(val) => setSelectedIdx(val)}
        emojis={emojiRes.emojis}
        question={emojiRes.question}
        questionPrefix="Select"
      />
      <h3>You selected {selectedIdx}</h3>
    </div>
  );
};

export default App;
```
