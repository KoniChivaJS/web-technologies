// Завдання 1: Операції з масивом фруктів
function fruitsOperations() {
  let fruits = ["яблуко", "банан", "апельсин", "груша"];

  fruits.pop();
  console.log("1.1 Оновлений масив фруктів:", fruits);

  fruits.unshift("ананас");
  console.log("1.2 Масив після додавання ананаса:", fruits);

  fruits.sort().reverse();
  console.log("1.3 Масив після сортування:", fruits);

  console.log("1.4 Індекс яблука:", fruits.indexOf("яблуко"));
}

function colorsOperations() {
  let colors = ["червоний", "синій", "зелений", "жовтий", "темно-синій"];

  let longest = colors.reduce((a, b) => (a.length > b.length ? a : b));
  let shortest = colors.reduce((a, b) => (a.length < b.length ? a : b));
  console.log("2.1 Найдовший колір:", longest);
  console.log("2.2 Найкоротший колір:", shortest);

  colors = colors.filter((color) => color.includes("синій"));
  console.log("2.3 Масив після фільтрації:", colors);

  console.log("2.4 Кольори у рядку:", colors.join(", "));
}

function employeesOperations() {
  let employees = [
    { name: "Іван", age: 25, position: "розробник" },
    { name: "Марія", age: 30, position: "дизайнер" },
    { name: "Петро", age: 35, position: "розробник" },
  ];

  employees.sort((a, b) => a.name.localeCompare(b.name));
  console.log("3.1 Відсортовані працівники:", employees);

  let developers = employees.filter((emp) => emp.position === "розробник");
  console.log("3.2 Розробники:", developers);

  employees = employees.filter((emp) => emp.age !== 30);
  console.log("3.3 Оновлений список:", employees);

  employees.push({ name: "Андрій", age: 28, position: "менеджер" });
  console.log("3.4 Оновлений список після додавання:", employees);
}

function studentsOperations() {
  let students = [
    { name: "Анна", age: 19, course: 2 },
    { name: "Олексій", age: 21, course: 3 },
    { name: "Марія", age: 18, course: 1 },
  ];

  students = students.filter((student) => student.name !== "Олексій");
  console.log("4.1 Оновлений список студентів:", students);

  students.push({ name: "Ігор", age: 22, course: 3 });
  console.log("4.2 Додали нового студента:", students);

  students.sort((a, b) => b.age - a.age);
  console.log("4.3 Відсортовані студенти:", students);

  console.log(
    "4.4 Студент на 3 курсі:",
    students.find((student) => student.course === 3)
  );
}

function numbersOperations() {
  let numbers = [2, 5, 8, 3, 10];

  console.log(
    "5.1 Квадрати чисел:",
    numbers.map((n) => n ** 2)
  );

  console.log(
    "5.2 Парні числа:",
    numbers.filter((n) => n % 2 === 0)
  );

  console.log(
    "5.3 Сума чисел:",
    numbers.reduce((sum, n) => sum + n, 0)
  );

  let newNumbers = [12, 15, 18, 21, 24];
  numbers = [...numbers, ...newNumbers];
  console.log("5.4 Оновлений масив:", numbers);

  numbers.splice(0, 3);
  console.log("5.5 Масив після видалення:", numbers);
}

function libraryManagement() {
  let library = [
    {
      title: "Книга1",
      author: "Автор1",
      genre: "Фантастика",
      pages: 250,
      isAvailable: true,
    },
    {
      title: "Книга2",
      author: "Автор2",
      genre: "Детектив",
      pages: 300,
      isAvailable: false,
    },
  ];

  function addBook(title, author, genre, pages) {
    library.push({ title, author, genre, pages, isAvailable: true });
  }

  function removeBook(title) {
    library = library.filter((book) => book.title !== title);
  }

  function findBooksByAuthor(author) {
    return library.filter((book) => book.author === author);
    // return library.find((book) => book.author === author);
  }

  function toggleBookAvailability(title, isBorrowed) {
    let book = library.find((book) => book.title === title);
    if (book) book.isAvailable = !isBorrowed;
  }

  function sortBooksByPages() {
    library.sort((a, b) => a.pages - b.pages);
  }

  function getBooksStatistics() {
    return {
      totalBooks: library.length,
      availableBooks: library.filter((book) => book.isAvailable).length,
      borrowedBooks: library.filter((book) => !book.isAvailable).length,
      averagePages:
        library.reduce((sum, book) => sum + book.pages, 0) / library.length,
    };
  }

  console.log("6.1 Початкова бібліотека:", library);
  addBook("Книга3", "Автор1", "Роман", 320);
  console.log("6.2 Після додавання книги:", library);
}

function studentObjectOperations() {
  let student = { name: "Іван", age: 20, course: 2 };

  student.subjects = ["Математика", "Програмування", "Фізика"];
  console.log("7.1 Після додавання предметів:", student);

  delete student.age;
  console.log("7.2 Після видалення віку:", student);
}

fruitsOperations();
colorsOperations();
employeesOperations();
studentsOperations();
numbersOperations();
libraryManagement();
studentObjectOperations();
