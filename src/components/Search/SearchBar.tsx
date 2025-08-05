import { css, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useProportionHook } from "../../hooks/useWindowHooks";
import { useWindowContext } from "../../context/WindowContext";

const SUGGESTIONS = [
  "TikTok",
  "YouTube",
  "Google",
  "Google Play",
  "Google Drive",
  "Google Docs",
  "Google Slides",
  "ChatGPT",
  "Facebook",
  "Instagram",
  "Whatsapp",
  "Google Translate",
  "What is the meaning of life?",
  "How can I find my purpose?",
  "Keys to happiness",
  "Dealing with failure",
  "Feeling lost advice",
  "Improving relationships",
  "Best ways to manage stress",
  "Making important life decisions",
  "Secret to a fulfilling life",
  "Achieving my goals",
  "Signs of a midlife crisis",
  "Cultivating gratitude",
  "Prioritizing in life",
  "Developing a positive mindset",
  "Important life skills to learn",
  "Taylor Swift height",
  "Sabrina Carpenter height",
  "Height of Burj Khalifa",
  "Oprah Winfrey overcoming adversity",
  "Life lessons from Steve Jobs",
  "Maya Angelou finding her voice",
  "Nelson Mandela resilience",
  "Eleanor Roosevelt women's roles",
  "Michelle Obama journey",
  "Be more like Dwayne 'The Rock' Johnson",
  "Atticus Finch character lessons",
  "Frida Kahlo art and identity",
  "Martin Luther King Jr. leadership",
  "J.K. Rowling overcoming rejection",
  "Elizabeth Bennet character insights",
  "Channeling inner Beyoncé",
  "Robin Williams struggles",
  "Ruth Bader Ginsburg justice",
  "Hermione Granger character lessons",
  "Walt Disney turning dreams into reality",
  "Forrest Gump life lessons",
  "Malala Yousafzai inspiration",
  "Ellen DeGeneres journey",
  "Leonardo DiCaprio environmental advocacy",
  "Anne Frank life lessons",
  "Goldfish recipes",
  "Easy pasta dishes",
  "Best practices for meditation",
  "How to start a garden",
  "Tips for public speaking",
  "Healthy smoothie recipes",
  "Travel tips for solo travelers",
  "How to create a budget",
  "Best books for personal development",
  "How to improve time management",
  "DIY home decor ideas",
  "How to learn a new language",
  "Best exercises for beginners",
  "How to make homemade pizza",
  "Tips for effective networking",
  "How to write a resume",
  "Best podcasts for motivation",
  "How to practice mindfulness",
  "Creative writing prompts",
  "How to build self-confidence",
  "Tips for a successful interview",
  "How can I channel my inner Beyoncé for confidence?",
  "What can we learn from the struggles of Robin Williams?",
  "How did Ruth Bader Ginsburg fight for justice?",
  "What can I learn from the character of Hermione Granger in 'Harry Potter'?",
  "How did Walt Disney turn dreams into reality?",
  "What are the life lessons from the character of Forrest Gump?",
  "How can I find inspiration in the life of Malala Yousafzai?",
  "What can we learn from the journey of Ellen DeGeneres?",
  "How did Leonardo DiCaprio advocate for environmental change?",
  "What are the key lessons from the life of Anne Frank?",
  "How can I find my purpose?",
  "What are the keys to happiness?",
  "How do I deal with failure?",
  "What should I do when I'm feeling lost?",
  "How can I improve my relationships?",
  "What are the best ways to manage stress?",
  "How do I make important life decisions?",
  "What is the secret to a fulfilling life?",
  "How can I achieve my goals?",
  "What are the signs of a midlife crisis?",
  "How do I cultivate gratitude?",
  "What should I prioritize in life?",
  "How can I develop a positive mindset?",
  "What are the most important life skills to learn?",
  "What can I learn from Taylor Swift's career?",
  "How did Oprah Winfrey overcome adversity?",
  "What life lessons can we learn from Steve Jobs?",
  "How did Maya Angelou find her voice?",
  "What can we learn from the resilience of Nelson Mandela?",
  "How did Eleanor Roosevelt redefine women's roles?",
  "What are the key takeaways from Michelle Obama's journey?",
  "How can I be more like Dwayne 'The Rock' Johnson in my life?",
  "What can I learn from the character of Atticus Finch in 'To Kill a Mockingbird'?",
  "How did Frida Kahlo express her identity through art?",
  "What can we learn from the leadership of Martin Luther King Jr.?",
  "How did J.K. Rowling overcome rejection to succeed?",
  "What are the life lessons from the character of Elizabeth Bennet in 'Pride and Prejudice'?",
  "How can I find my purpose?",
  "What are the keys to happiness?",
  "How do I deal with failure?",
  "What should I do when I'm feeling lost?",
  "How can I improve my relationships?",
  "What are the best ways to manage stress?",
  "How do I make important life decisions?",
  "What is the secret to a fulfilling life?",
  "How can I achieve my goals?",
  "What are the signs of a midlife crisis?",
  "How do I cultivate gratitude?",
  "What should I prioritize in life?",
  "How can I develop a positive mindset?",
  "What are the most important life skills to learn?",
  "Quantum Computing",
  "Q learning",
  "Using computers",
  "Umbrella for sale",
  "Vanilla ice cream",
  "Gojo Satoru",
  "Geto Suguru",
  "Suguru Geto",
  "Satoru Gojo",
  "Naruto Uzumaki",
  "Uzumaki Naruto",
  "Uchiha Sasuke",
  "Sasuke Uchiha",
  "Uchiha clan",
  "Uzumaki Kushina",
  "Kushina Uzumaki",
  "Conan Edogawa",
  "Edogawa Conan",
  "Detective Conan",
  "Shin-chan",
  "Doraemon",
  "Nobita",
  "Anya Forger",
  "Loid Forger",
  "Twilight",
  "Yor Briar",
  "Yor Forger",
  "Yuri Briar",
  "BLACKPINK",
  "BTS",
  "SEVENTEEN",
  "ENHYPEN",
  "Espresso (song by Sabrina Carpenter)",
  "So Long, London (song by Taylor Swift)",
  "Welcome To New York (song by Taylor Swift)",
  "Taste (song by Sabrina Carpenter)",
  "Please Please Please (song by Sabrina Carpenter)",
  "Getaway Car (song by Taylor Swift)",
  "K/DA",
  "Guilty as Sin? (song by Taylor Swift)",
  "All too well (song by Taylor Swift)",
  "Billie Eilish",
  "Peter (song by Taylor Swift)",
  "Blank Space (song by Taylor Swift)",
  "aespa",
  "Black Mamba (song by aespa)",
  "Lana Del Rey",
  "Summertime Sadness (song by Lana Del Rey)",
  "Chemtrails over the Country Club (song by Lana Del Rey)",
  "Salvatore (song by Lana Del Rey)",
  "Santa Tell me (song by Ariana Grande)",
  "Ariana Grande",
  "Thank U, next (song by Ariana Grande)",
  "Fake Love (song by BTS)",
  "Inner Child (song by BTS)",
  "vampire (song by Olivia Rodrigo)",
  "Olivia Rodrigo",
  "P1Harmonny",
  "Mariah Carey",
  "Whistle (song by BLACKPINK)",
  "APT. (song by Rose and Bruno Mars)",
  "As if it's your Last (song by BLACKPINK)",
  "Kill this love (song by BLACKPINK)",
  "Lady Gaga",
  "The Weeknd",
  "WILDFLOWER (song by Billie Eilish)",
  "That's so True (song by Gracie Abrams)",
  "360 (song by Charlie XCX)",
  "Charlie XCX",
  "Why is the sky blue?",
  "Circles (song by SEVENTEEN)",
  "Kidult (song by SEVENTEEN)",
  "We On (song by BTS)",
  "Can dogs eat apples?",
  "Can you freeze milk?",
  "Are ghosts real?",
  "Is Santa real?",
  "How to cook rice",
  "Adele",
  "Diet Pepsi (song by Addison Rae)",
  "Newjeans",
  "Pledis entertainment",
  "HYBE",
  "Spotify",
  "Spotify stats",
  "Attention (song by Newjeans)",
  "Ditto (song by Newjeans)",
  "Hype Boy (song by Newjeans)",
  "New Jeans (song by Newjeans)",
  "Problem (song by Ariana Grande)",
  "7 rings (song by Ariana Grande)",
  "1+1",
  "2MINUS1 (song by SEVENTEEN)",
  "Bruno Mars",
  "Die with a Smile (song by Bruno Mars and Lady Gaga)",
  "45.8 billion won to USD",
  "5 in roman numerals",
  "647 area code",
  "8x8",
  "Eras Tour",
  "lol",
  "Jujutsu Kaisen",
  "jjk",
  "Oshi No Ko",
  "My Hero Academia",
  "Demon Slayer",
  "Tanjiro",
  "How to get abs",
  "Who am I",
  "Rugs eBay",
  "eBay",
  "Apple",
  "iPhones",
  "Android",
  "Samsung",
  ":)",
  "::before css",
  "How to become a billionare in one day",
  "1234567890",
  "Isn't that sweet? I guess so",
  "I just wanna be part of your symphonieeee",
  "Yass, queen",
  "Is it normal for your poop to be green?",
  "Please please please don't prove I'm right",
  "Doja Cat",
  "I said what I said, I'd rather be famous instead",
  "STAYC",
  "ATEEZ",
  "Hello (song by Adele)",
  "ILLIT",
  "Wait a minute",
  "Magnetic (song by ILLIT)",
  "Cherish my love",
  "Oh my god! Don't you know I'm a cabbage?",
  "I feel so much lighter like a feather with you off my mind",
  "Feather (song by Sabrina Carpenter)",
];

export function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");

  const theme = useTheme();

  const { windowWidth } = useWindowContext();

  const { size } = useProportionHook(
    windowWidth,
    windowWidth * 0.9,
    theme.windowSize.tablet,
  );

  const width = Math.round(size * 0.9);

  return (
    <>
      <SearchbarContainer className="input-container" width={width}>
        <InputArea
          id="input"
          placeholder="Type something..."
          onChange={(e) => setSearchValue(e.target.value)}
          width={width}
          isWright={
            searchValue.length > 0 &&
            SUGGESTIONS.filter((value) =>
              value.toUpperCase().includes(searchValue.toUpperCase()),
            ).length > 0
          }
          theme={theme}
        />
        <SuggestionsExtract searchValue={searchValue} width={width} />
      </SearchbarContainer>
    </>
  );
}

function SuggestionsExtract(props: { searchValue: string; width: number }) {
  const { searchValue, width } = props;

  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);
  const suggestionHeight = ref.current?.offsetHeight
    ? ref.current.offsetHeight
    : 56;
  if (searchValue.length > 0) {
    return SUGGESTIONS.filter((value) =>
      value.toUpperCase().includes(searchValue.toUpperCase()),
    ).map((item, index) => (
      <Suggestion
        width={width}
        ref={ref}
        theme={theme}
        top={suggestionHeight * (index + 1)}
      >
        {item}
      </Suggestion>
    ));
  }
}

const SearchbarContainer = styled.div<{ width: number }>(
  ({ width }) => css`
    position: relative;
    border-radius: 1rem;
    width: ${width}px;
    transition: ease 0.5s;
    box-sizing: border-box;

    border: 1px solid #d1d1d1;
    background: rgb(255, 255, 255);
  `,
);

const InputArea = styled.input<{
  isWright: boolean;
  width: number;
  theme: Theme;
}>(
  ({ width, isWright, theme }) => css`
    position: relative;
    background: rgb(0, 0, 0, 0);
    border: none;
    outline: none;
    padding: 1rem;
    width: ${width - 2}px;
    box-sizing: border-box;
    font-size: 1rem;
    z-index: 1;

    font-family: ${theme.mode.logo.font};
    ${isWright
      ? "border-top-left-radius: 1rem;    border-top-right-radius: 1rem;"
      : "border-radius: 1rem;"}
  `,
);

const Suggestion = styled.div<{ theme: Theme; top: number; width: number }>(
  ({ theme, top, width }) => css`
    top: ${top - 18}px;
    background: rgb(255, 255, 255);
    outline: none;
    padding: 1rem;
    width: ${width}px;
    box-sizing: border-box;
    user-select: none;
    transition: ease 0.3s;
    text-align: left;

    transform: translateX(-1px);

    border-width: 0 1px 0 1px;
    border-style: solid;
    border-color: #d1d1d1;

    z-index: 1;

    position: absolute;

    font-family: ${theme.mode.logo.font};

    .input-container :nth-child(2) {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }

    &:last-child {
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border-width: 0 1px 1px 1px;
    }

    &:hover {
      background-color: rgba(216, 216, 216);
    }
  `,
);
