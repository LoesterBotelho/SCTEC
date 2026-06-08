// =====================================================
// READING TRACKER
// APP.JS - PARTE 3A
// Core + CRUD + Dashboard + Search + Filters + Paging
// =====================================================

const STORAGE_KEY = "readingTrackerBooks";

let books = [];

let currentPage = 1;

let pageSize = 50;

let currentFilter = "all";

let searchText = "";

// =====================================================
// STORAGE
// =====================================================

function loadBooks() {

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );

    if (!data) {

        books = [];

        return;
    }

    try {

        books =
            JSON.parse(data);

    }
    catch {

        books = [];
    }
}

function saveBooks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(books)
    );
}

// =====================================================
// ID
// =====================================================

function generateId() {

    return Date.now() +
        Math.floor(
            Math.random() * 10000
        );
}

// =====================================================
// CRUD
// =====================================================

function addBook(book) {

    book.id =
        generateId();

    book.history =
        book.history || [];

    book.createdAt =
        new Date()
            .toISOString();

    books.push(book);

    saveBooks();

    refreshUI();
}

function updateBook(id, updatedBook) {

    const index =
        books.findIndex(
            b => b.id == id
        );

    if (index === -1)
        return;

    books[index] = {

        ...books[index],

        ...updatedBook
    };

    saveBooks();

    refreshUI();
}

function deleteBook(id) {

    const confirmed =
        confirm(
            "Delete this book?"
        );

    if (!confirmed)
        return;

    books =
        books.filter(
            b => b.id != id
        );

    saveBooks();

    refreshUI();
}

function getBook(id) {

    return books.find(
        b => b.id == id
    );
}

// =====================================================
// HISTORY
// =====================================================

function addHistoryRecord(
    bookId,
    vocabularyPercent
) {

    const book =
        getBook(bookId);

    if (!book)
        return;

    if (!book.history)
        book.history = [];

    book.history.push({

        date:
            new Date()
                .toISOString(),

        vocabularyPercent
    });

    book.vocabularyPercent =
        vocabularyPercent;

    book.timesRead =
        (book.timesRead || 0) + 1;

    saveBooks();
}

// =====================================================
// STATUS
// =====================================================

function getBookStatus(book) {

    const v =
        Number(
            book.vocabularyPercent || 0
        );

    if (v >= 90)
        return "Mastered";

    if (v >= 70)
        return "Reviewing";

    if (v >= 50)
        return "Learning";

    return "New";
}

// =====================================================
// DASHBOARD
// =====================================================

function updateDashboard() {

    const totalBooks =
        books.length;

    const today =
        new Date();

    let reviewsDue = 0;

    let overdueReviews = 0;

    let masteredBooks = 0;

    let totalReads = 0;

    let vocabularySum = 0;

    books.forEach(book => {

        vocabularySum +=
            Number(
                book.vocabularyPercent || 0
            );

        totalReads +=
            Number(
                book.timesRead || 0
            );

        if (
            Number(
                book.vocabularyPercent || 0
            ) >= 90
        ) {

            masteredBooks++;
        }

        if (
            book.nextReading
        ) {

            const nextDate =
                new Date(
                    book.nextReading
                );

            if (
                nextDate <= today
            ) {

                reviewsDue++;
            }

            if (
                nextDate < today
            ) {

                overdueReviews++;
            }
        }
    });

    const averageVocabulary =
        totalBooks > 0
            ? Math.round(
                vocabularySum /
                totalBooks
            )
            : 0;

    document.getElementById(
        "totalBooks"
    ).textContent =
        totalBooks;

    document.getElementById(
        "reviewsDue"
    ).textContent =
        reviewsDue;

    document.getElementById(
        "overdueReviews"
    ).textContent =
        overdueReviews;

    document.getElementById(
        "averageVocabulary"
    ).textContent =
        averageVocabulary + "%";

    document.getElementById(
        "masteredBooks"
    ).textContent =
        masteredBooks;

    document.getElementById(
        "totalReads"
    ).textContent =
        totalReads;
}

// =====================================================
// SEARCH
// =====================================================

function filterBySearch(list) {

    if (!searchText)
        return list;

    const search =
        searchText.toLowerCase();

    return list.filter(book => {

        return (

            (book.title || "")
                .toLowerCase()
                .includes(search)

            ||

            (book.author || "")
                .toLowerCase()
                .includes(search)

        );

    });
}

// =====================================================
// FILTERS
// =====================================================

function applyFilter(list) {

    let filtered =
        [...list];

    switch (
        currentFilter
    ) {

        case "recent":

            filtered.sort(

                (a, b) =>

                    new Date(
                        b.lastReading || 0
                    )

                    -

                    new Date(
                        a.lastReading || 0
                    )

            );

            break;

        case "oldest":

            filtered.sort(

                (a, b) =>

                    new Date(
                        a.lastReading || 0
                    )

                    -

                    new Date(
                        b.lastReading || 0
                    )

            );

            break;

        case "review":

            filtered.sort(

                (a, b) =>

                    new Date(
                        a.nextReading || 0
                    )

                    -

                    new Date(
                        b.nextReading || 0
                    )

            );

            break;

        case "overdue":

            filtered =
                filtered.filter(

                    book =>

                        book.nextReading

                        &&

                        new Date(
                            book.nextReading
                        ) < new Date()

                );

            break;

        case "highVocabulary":

            filtered.sort(

                (a, b) =>

                    (b.vocabularyPercent || 0)

                    -

                    (a.vocabularyPercent || 0)

            );

            break;

        case "lowVocabulary":

            filtered.sort(

                (a, b) =>

                    (a.vocabularyPercent || 0)

                    -

                    (b.vocabularyPercent || 0)

            );

            break;

        case "A1":
        case "A2":
        case "B1":
        case "B2":
        case "C1":
        case "C2":

            filtered =
                filtered.filter(

                    book =>

                        book.level ===
                        currentFilter

                );

            break;
    }

    return filtered;
}

// =====================================================
// PAGINATION
// =====================================================

function paginate(list) {

    const start =
        (currentPage - 1)
        * pageSize;

    const end =
        start + pageSize;

    return list.slice(
        start,
        end
    );
}

// =====================================================
// MAIN FILTER PIPELINE
// =====================================================

function getVisibleBooks() {

    let result =
        [...books];

    result =
        filterBySearch(
            result
        );

    result =
        applyFilter(
            result
        );

    return result;
}

// =====================================================
// RENDER TABLE
// =====================================================

function renderTable() {

    const tbody =
        document.getElementById(
            "booksTableBody"
        );

    if (!tbody)
        return;

    const visibleBooks =
        getVisibleBooks();

    const pagedBooks =
        paginate(
            visibleBooks
        );

    tbody.innerHTML = "";

    pagedBooks.forEach(book => {

        const row =
            document.createElement(
                "tr"
            );

        const status =
            getBookStatus(
                book
            );

        const badgeClass =
            `badge-${(
                book.level || ""
            ).toLowerCase()}`;

        const progress =
            Number(
                book.vocabularyPercent || 0
            );

        const overdue =
            book.nextReading &&
            new Date(
                book.nextReading
            ) < new Date();

        if (overdue) {

            row.classList.add(
                "overdue"
            );
        }

        row.innerHTML = `

            <td>
                ${book.title || ""}
            </td>

            <td>
                ${book.author || ""}
            </td>

            <td>
                <span
                    class="badge ${badgeClass}">
                    ${book.level || ""}
                </span>
            </td>

            <td>
                ${book.pages || 0}
            </td>

            <td>

                <div>
                    ${progress}%
                </div>

                <div
                    class="progress">

                    <div
                        class="progress-fill"
                        style="width:${progress}%">
                    </div>

                </div>

            </td>

            <td>
                ${book.timesRead || 0}
            </td>

            <td>
                ${book.lastReading || ""}
            </td>

            <td>
                ${book.nextReading || ""}
            </td>

            <td>
                ${status}
            </td>

            <td>

                <button
                    class="btn btn-primary btn-edit"
                    data-id="${book.id}">

                    Edit

                </button>

                <button
                    class="btn btn-secondary btn-history"
                    data-id="${book.id}">

                    History

                </button>

                <button
                    class="btn btn-danger btn-delete"
                    data-id="${book.id}">

                    Delete

                </button>

            </td>

        `;

        tbody.appendChild(
            row
        );

    });

    attachTableEvents();
}

// =====================================================
// PAGINATION UI
// =====================================================

function renderPagination() {

    const container =
        document.getElementById(
            "pagination"
        );

    if (!container)
        return;

    const total =
        getVisibleBooks().length;

    const pages =
        Math.ceil(
            total / pageSize
        );

    container.innerHTML = "";

    for (
        let i = 1;
        i <= pages;
        i++
    ) {

        const btn =
            document.createElement(
                "button"
            );

        btn.className =
            "page-btn";

        if (
            i === currentPage
        ) {

            btn.classList.add(
                "active"
            );
        }

        btn.textContent = i;

        btn.addEventListener(
            "click",
            () => {

                currentPage = i;

                renderTable();

                renderPagination();

            }
        );

        container.appendChild(
            btn
        );
    }
}

// =====================================================
// MODAL
// =====================================================

function openModal() {

    document
        .getElementById(
            "bookModal"
        )
        .classList.add(
            "active"
        );
}

function closeModal() {

    document
        .getElementById(
            "bookModal"
        )
        .classList.remove(
            "active"
        );
}

function clearForm() {

    document
        .getElementById(
            "bookForm"
        )
        .reset();

    document
        .getElementById(
            "bookId"
        )
        .value = "";
}

function fillForm(book) {

    document.getElementById(
        "bookId"
    ).value =
        book.id;

    document.getElementById(
        "title"
    ).value =
        book.title || "";

    document.getElementById(
        "author"
    ).value =
        book.author || "";

    document.getElementById(
        "pages"
    ).value =
        book.pages || "";

    document.getElementById(
        "level"
    ).value =
        book.level || "A1";

    document.getElementById(
        "totalWords"
    ).value =
        book.totalWords || "";

    document.getElementById(
        "uniqueWords"
    ).value =
        book.uniqueWords || "";

    document.getElementById(
        "vocabularyPercent"
    ).value =
        book.vocabularyPercent || "";

    document.getElementById(
        "timesRead"
    ).value =
        book.timesRead || 0;

    document.getElementById(
        "lastReading"
    ).value =
        book.lastReading || "";

    document.getElementById(
        "nextReading"
    ).value =
        book.nextReading || "";

    document.getElementById(
        "notes"
    ).value =
        book.notes || "";
}

// =====================================================
// SAVE FORM
// =====================================================

function saveForm() {

    const id =
        document
            .getElementById(
                "bookId"
            )
            .value;

    const book = {

        title:
            document
                .getElementById(
                    "title"
                )
                .value,

        author:
            document
                .getElementById(
                    "author"
                )
                .value,

        pages:
            Number(
                document
                    .getElementById(
                        "pages"
                    )
                    .value
            ),

        level:
            document
                .getElementById(
                    "level"
                )
                .value,

        totalWords:
            Number(
                document
                    .getElementById(
                        "totalWords"
                    )
                    .value
            ),

        uniqueWords:
            Number(
                document
                    .getElementById(
                        "uniqueWords"
                    )
                    .value
            ),

        vocabularyPercent:
            Number(
                document
                    .getElementById(
                        "vocabularyPercent"
                    )
                    .value
            ),

        timesRead:
            Number(
                document
                    .getElementById(
                        "timesRead"
                    )
                    .value
            ),

        lastReading:
            document
                .getElementById(
                    "lastReading"
                )
                .value,

        nextReading:
            document
                .getElementById(
                    "nextReading"
                )
                .value,

        notes:
            document
                .getElementById(
                    "notes"
                )
                .value
    };

    if (id) {

        updateBook(
            Number(id),
            book
        );

    } else {

        addBook(book);
    }

    closeModal();
}

// =====================================================
// HISTORY
// =====================================================

function showHistory(id) {

    const book =
        getBook(id);

    if (!book)
        return;

    const container =
        document.getElementById(
            "historyContainer"
        );

    container.innerHTML =
        `<h3>${book.title}</h3>`;

    if (
        !book.history ||
        !book.history.length
    ) {

        container.innerHTML +=
            "<p>No history.</p>";

    } else {

        book.history.forEach(
            item => {

                container.innerHTML +=
                `
                <div class="history-item">

                    <strong>
                        ${item.date}
                    </strong>

                    <br>

                    Vocabulary:
                    ${item.vocabularyPercent}%

                </div>
                `;
            }
        );
    }

    document
        .getElementById(
            "historyModal"
        )
        .classList.add(
            "active"
        );
}

// =====================================================
// SPACED REPETITION
// =====================================================

function calculateNextReview() {

    const reads =
        Number(
            document
                .getElementById(
                    "timesRead"
                )
                .value || 0
        );

    const today =
        new Date();

    let days = 1;

    switch (reads) {

        case 0:
            days = 1;
            break;

        case 1:
            days = 3;
            break;

        case 2:
            days = 7;
            break;

        case 3:
            days = 14;
            break;

        case 4:
            days = 30;
            break;

        default:
            days = 90;
    }

    today.setDate(
        today.getDate()
        + days
    );

    return today
        .toISOString()
        .split("T")[0];
}

// =====================================================
// TABLE BUTTONS
// =====================================================

function attachTableEvents() {

    document
        .querySelectorAll(
            ".btn-edit"
        )
        .forEach(btn => {

            btn.onclick =
                () => {

                const id =
                    Number(
                        btn.dataset.id
                    );

                const book =
                    getBook(id);

                if (!book)
                    return;

                fillForm(book);

                openModal();

            };
        });

    document
        .querySelectorAll(
            ".btn-delete"
        )
        .forEach(btn => {

            btn.onclick =
                () => {

                deleteBook(
                    Number(
                        btn.dataset.id
                    )
                );

            };
        });

    document
        .querySelectorAll(
            ".btn-history"
        )
        .forEach(btn => {

            btn.onclick =
                () => {

                showHistory(
                    Number(
                        btn.dataset.id
                    )
                );

            };
        });
}

// =====================================================
// REFRESH
// =====================================================

function refreshUI() {

    updateDashboard();

    renderTable();

    renderPagination();

    saveBooks();
}

