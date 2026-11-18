const courses = [
    {
        id: 1,
        level: "UG",
        title: "B.E. in Computer Science & Engineering",
        duration: "4 Years (8 Semesters)",
        description: "Covers algorithms, data structures, operating systems, computer architecture, database management, and full-stack software engineering.",
        eligibility: "10+2 (PUC) with Physics and Mathematics as compulsory subjects along with Chemistry/Computer Science/Electronics, with a minimum aggregate of 45% (40% for reserved categories) and a valid CET/COMEDK/JEE rank."
    },
    {
        id: 2,
        level: "UG",
        title: "B.E. in Artificial Intelligence & Machine Learning",
        duration: "4 Years (8 Semesters)",
        description: "Focuses on neural networks, deep learning, natural language processing, computer vision, and statistical data modeling.",
        eligibility: "10+2 (PUC) with Physics and Mathematics and a minimum of 45% aggregate marks, qualified through state or national engineering entrance exams."
    },
    {
        id: 3,
        level: "UG",
        title: "B.E. in Electronics & Communication Engineering",
        duration: "4 Years (8 Semesters)",
        description: "Deals with analog and digital circuits, VLSI design, embedded systems, microprocessors, and wireless communication networks.",
        eligibility: "10+2 (PUC) with Physics, Chemistry, and Mathematics with at least 45% aggregate marks and a valid entrance exam score."
    },
    {
        id: 4,
        level: "UG",
        title: "B.E. in Mechanical Engineering",
        duration: "4 Years (8 Semesters)",
        description: "Encompasses thermodynamics, fluid mechanics, CAD/CAM, robotics, manufacturing processes, and automotive engineering.",
        eligibility: "10+2 (PUC) with Physics, Chemistry, and Mathematics (minimum 45% aggregate) or a 3-year Engineering Diploma for lateral entry into 2nd year."
    },
    {
        id: 5,
        level: "PG",
        title: "M.Tech in Data Science & Engineering",
        duration: "2 Years (4 Semesters)",
        description: "Advanced postgraduate program in big data analytics, cloud computing architecture, distributed systems, and predictive modeling.",
        eligibility: "B.E./B.Tech in CSE, ISE, ECE, or equivalent with a minimum of 50% aggregate marks and a valid GATE or PGCET score."
    }
];

const courseGrid = document.getElementById("courseGrid");
const searchInput = document.getElementById("searchInput");
const levelFilter = document.getElementById("levelFilter");
const modal = document.getElementById("courseModal");
const closeModal = document.getElementById("closeModal");

function renderCourses(list) {
    courseGrid.innerHTML = "";
    if (list.length === 0) {
        courseGrid.innerHTML = "<p>No courses match your search criteria.</p>";
        return;
    }

    list.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div>
                <span class="badge">${course.level}</span>
                <h3>${course.title}</h3>
                <div class="meta"><strong>Duration:</strong> ${course.duration}</div>
                <p>${course.description.substring(0, 105)}...</p>
            </div>
            <button class="btn" onclick="openCourseModal(${course.id})">View Details & Eligibility</button>
        `;
        courseGrid.appendChild(card);
    });
}

function filterCourses() {
    const query = searchInput.value.toLowerCase();
    const level = levelFilter.value;

    const filtered = courses.filter(course => {
        const matchesText = course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query);
        const matchesLevel = level === "ALL" || course.level === level;
        return matchesText && matchesLevel;
    });

    renderCourses(filtered);
}

window.openCourseModal = function(id) {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    document.getElementById("modalBadge").textContent = course.level;
    document.getElementById("modalTitle").textContent = course.title;
    document.getElementById("modalDuration").textContent = course.duration;
    document.getElementById("modalDescription").textContent = course.description;
    document.getElementById("modalEligibility").textContent = course.eligibility;
    modal.classList.remove("hidden");
};

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});

searchInput.addEventListener("input", filterCourses);
levelFilter.addEventListener("change", filterCourses);

renderCourses(courses);