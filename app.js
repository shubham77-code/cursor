const sampleNews = [
  {
    source: "OpenAI",
    time: "2h ago",
    title: "OpenAI introduces a smaller multimodal model for realtime apps",
    summary:
      "The release focuses on lower latency and cheaper inference for voice and vision experiences, helping teams ship AI copilots in production faster.",
    tags: ["LLMs", "Multimodal", "Product"],
    url: "https://openai.com"
  },
  {
    source: "NVIDIA",
    time: "4h ago",
    title: "New GPU stack improves AI training efficiency in data centers",
    summary:
      "NVIDIA showcased improvements in memory bandwidth and scheduling tools that can reduce model training time while lowering infrastructure costs.",
    tags: ["Hardware", "Training", "Infra"],
    url: "https://www.nvidia.com"
  },
  {
    source: "Anthropic",
    time: "7h ago",
    title: "Safety evaluation benchmarks expanded for agentic systems",
    summary:
      "The updated benchmark suite adds scenarios around tool misuse, policy compliance, and long-horizon planning risks in autonomous workflows.",
    tags: ["Safety", "Agents", "Research"],
    url: "https://www.anthropic.com"
  },
  {
    source: "Google DeepMind",
    time: "10h ago",
    title: "Researchers publish more efficient method for long-context reasoning",
    summary:
      "A new architecture combines sparse attention and retrieval to preserve reasoning quality over long documents with significantly less compute.",
    tags: ["Research", "Context", "Efficiency"],
    url: "https://deepmind.google"
  }
];

const feed = document.getElementById("feed");
const template = document.getElementById("newsCardTemplate");
const refreshBtn = document.getElementById("refreshBtn");

function shuffledNews(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function renderNews(newsItems) {
  feed.innerHTML = "";

  newsItems.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".source").textContent = item.source;
    fragment.querySelector(".time").textContent = item.time;
    fragment.querySelector(".title").textContent = item.title;
    fragment.querySelector(".summary").textContent = item.summary;

    const tagsContainer = fragment.querySelector(".tags");
    item.tags.forEach((tag) => {
      const chip = document.createElement("span");
      chip.className = "tag";
      chip.textContent = `#${tag}`;
      tagsContainer.append(chip);
    });

    const link = fragment.querySelector(".read-more");
    link.textContent = "Read full story";
    link.href = item.url;

    feed.append(fragment);
  });
}

refreshBtn.addEventListener("click", () => {
  renderNews(shuffledNews(sampleNews));
});

renderNews(sampleNews);
