import algorithms from "../assets/images/algorithms.jpg";
import dataIntensive from "../assets/images/data-intensive.jpg";
import fp from "../assets/images/fp.jpg";
import microservices from "../assets/images/microservices.jpg";
import patterns from "../assets/images/patterns.jpg";

export const bookshelfTemplate = `
  <h3 class="bookshelf__head">Andrii's books recommendations</h3>
  <p>There are lots of sources of information that you can use to become a great software engineer nowadays, but sometimes I enjoy reading a well-written book that delves into the topic.</p>
  <p>If you are somewhat like me probably you might find this list useful :)</p>
  <div class="bookshelf__container">
    <h4 class="bookshelf__heading">A Common-Sense Guide to Data Structures and Algorithms: Level Up Your Core Programming Skills</h4>
    <img class="bookshelf__image" src="${algorithms}" alt="A Common-Sense Guide to Data Structures and Algorithms: Level Up Your Core Programming Skills">
  </div>
  <div class="bookshelf__container">
    <h4 class="bookshelf__heading">Building Microservices: Designing Fine-Grained Systems</h4>
    <img class="bookshelf__image" src="${microservices}" alt="Building Microservices: Designing Fine-Grained Systems">
  </div>
  <div class="bookshelf__container">
    <h4 class="bookshelf__heading">Design Patterns: Elements of Reusable Object-Oriented Software</h4>
    <img class="bookshelf__image" src="${patterns}" alt="Design Patterns: Elements of Reusable Object-Oriented Software">
  </div>
  <div class="bookshelf__container">
    <h4 class="bookshelf__heading">Designing Data-Intensive Applications</h4>
    <img class="bookshelf__image" src="${dataIntensive}" alt="Designing Data-Intensive Applications">
  </div>
  <div class="bookshelf__container">
    <h4 class="bookshelf__heading">Functional Programming in JavaScript</h4>
    <img class="bookshelf__image" src="${fp}" alt="Functional Programming in JavaScript">
  </div>  
`;
