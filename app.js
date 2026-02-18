const stories = [
  {
    source: "OpenAI",
    time: "2h ago",
    title: "OpenAI ships faster realtime AI for voice apps",
    summary:
      "The update focuses on low-latency responses so assistants can feel more natural in conversations, live captions, and interactive copilots.",
    url: "https://openai.com",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1600&q=80"
  },
  {
    source: "NVIDIA",
    time: "4h ago",
    title: "New AI hardware stack cuts model training time",
    summary:
      "Engineers reported better scheduling and memory throughput for large models, helping teams reduce infra cost for major training runs.",
    url: "https://www.nvidia.com",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1600&q=80"
  },
  {
    source: "Google DeepMind",
    time: "8h ago",
    title: "Long-context reasoning gets more efficient",
    summary:
      "A new approach improves performance on document-heavy tasks while using less compute, making enterprise AI workflows cheaper and faster.",
    url: "https://deepmind.google",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
  }
];

const feed = document.getElementById("feed");
const template = document.getElementById("storyTemplate");
const refreshBtn = document.getElementById("refreshBtn");

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function render(items) {
  feed.innerHTML = "";

  items.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".source").textContent = item.source;
    fragment.querySelector(".time").textContent = item.time;
    fragment.querySelector(".title").textContent = item.title;
    fragment.querySelector(".summary").textContent = item.summary;

    const link = fragment.querySelector(".read-more");
    link.href = item.url;

    fragment.querySelector(".story-bg").style.backgroundImage = `url('${item.image}')`;
    feed.append(fragment);
  });

  feed.scrollTo({ top: 0, behavior: "smooth" });
}

refreshBtn.addEventListener("click", () => {
  render(shuffle(stories));
});

render(stories);
