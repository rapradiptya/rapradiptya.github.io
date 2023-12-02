const searchInput = document.querySelector("#searchInput");
const searchResult = document.querySelector(".searchResult");
const searchCountNumber = document.querySelector(".searchCountNumber");
const searchCloseSvg = document.querySelector(".searchCloseSvg");

const posts = [
  {
    slug: "css-tips-and-tricks",
    title: "5 CSS Tips and Tricks Every Web Developer Should Know",
  },
  {
    slug: "js-and-operator-pitfalls",
    title: "Think Twice When Using '&&' Operator for Conditional Rendering",
  },
  {
    slug: "nextjs-vs-express",
    title: "Next.js vs Express: Which one is Better for a Backend Server?",
  },
  {
    slug: "role-based-auth-prisma-next-auth",
    title: "Building Role-Based Authentication with Next.js and Prisma",
  },
  {
    slug: "server-side-rendering-vs-client-side-rendering",
    title: "Server-Side Rendering (SSR) Vs Client-Side Rendering (CSR)",
  },
  {
    slug: "zustand-state-management-tool",
    title: "Zustand: Easiest Way for React State Management",
  }
];

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

searchCloseSvg.addEventListener("click", () => {
  searchInput.value = "";
  search.style.display = "none";
  searchResult.innerHTML = "";
  searchCountNumber.innerHTML = "";
});

const displayPosts = (filteredPosts) => {
  searchResult.innerHTML = filteredPosts
    .map(
      (post) =>
        `
        <div class="searchItem">
        <a href=/${post.slug}>
        <h1>${post.title}</h1>
        </a>
        </div>
    `
    )
    .join("");
  searchCountNumber.innerHTML = `Found: ${filteredPosts.length}`;
};

searchInput.addEventListener(
  "input",
  debounce(() => {
    if (searchInput.value.length > 2) {
      displayPosts(
        posts.filter(
          (item) => item.title.toLowerCase().indexOf(searchInput.value) !== -1
        )
      );
    } else {
      searchResult.innerHTML = "";
      searchCountNumber.innerHTML = "";
    }
  }, 300)
);
