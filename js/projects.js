document.addEventListener("DOMContentLoaded", function () {
  const projects = [
    {
      key: "toda",
      title: "Toda - Sustainable clothes borrow",
      img: "../asset/TodaLogo2.png",
      subtitle: "Creation, Design & Development (HTML, CSS & Javascript).",
      page: "../toda.html",
    },
    {
      key: "swaer",
      title: "Swaer",
      img: "../asset/TodaLogo3.png",
      subtitle: "A project about Swaer.",
      page: "../toda.html",
    },
    {
      key: "italian-kiosk",
      title: "Italian Kiosk",
      img: "../asset/TodaLogo2.png",
      subtitle: "Italian food kiosk branding.",
      page: "../toda.html",
    },
    {
      key: "dino-ghost-peppers",
      title: "Dino Ghost Peppers",
      img: "../asset/TodaLogo2.png",
      subtitle: "Spicy branding for a hot sauce startup.",
      page: "../toda.html",
    },
    {
      key: "acsi-rebranding",
      title: "ACSI Rebranding",
      img: "../asset/TodaLogo2.png",
      subtitle: "Rebranding for ACSI.",
      page: "../toda.html",
    },
  ];

  // Render moreProjects if present
  const container = document.getElementById("moreProjects");
  if (container) {
    const currentProjectKey = container.dataset.current;
    const moreProjects = projects
      .filter((p) => p.key !== currentProjectKey)
      .slice(0, 3);

    moreProjects.forEach((project) => {
      container.innerHTML += `
      <a href="${project.page}" class="projectCardLink">
        <div class="projectCard">
          <img src="${project.img}" alt="${project.title}" class="projectImg" />
          <h3 class="projectTitle">${project.title}</h3>
          <p class="projectSubtitle">${project.subtitle}</p>
        </div>
      </a>
      `;
    });
  }

  // Render indexProjects if present
  const containerIndex = document.getElementById("indexProjects");
  if (containerIndex) {
    projects.forEach((project) => {
      containerIndex.innerHTML += `
        <div class="indexProjectCard">
          <a href="${project.page}" class="indexProjectLink">
            <img src="${project.img}" alt="${project.title}" class="indexProjectImg" />
            <h3 class="indexProjectTitle">${project.title}</h3>
            <p class="indexProjectSubtitle">${project.subtitle}</p>
          </a>
        </div>
      `;
    });
  }
});
