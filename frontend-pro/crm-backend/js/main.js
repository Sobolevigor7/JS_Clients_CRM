/* eslint-disable no-inner-declarations */
/* eslint-disable default-param-last */
/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
/* eslint-disable no-loop-func */
/* eslint-disable max-len */
/* eslint-disable no-undef */

// const { default: Choices } = require("choices.js");

/* eslint-disable linebreak-style */

(async () => {
  const tableBody = document.querySelector('.table__body');
  const buttons = document.querySelectorAll('.table__header-button-button');
  const idButton = document.querySelector('.id');
  const fioButton = document.querySelector('.fio');
  const createdAtButton = document.querySelector('.date-of-creation');
  const updatedAtButton = document.querySelector('.date-of-change');
  const addNewClientButton = document.querySelector('.add-new-client');
  const searchInput = document.querySelector('.header__input');
  const modalBody = document.querySelector('.modal-body__contacts');
  let searchStringParam;
  let ClientsList;
  let serverDownMsg = '';
  let idReversed = false;
  let idActive = true;
  let fioReversed = false;
  let fioActive = false;
  let createdAtDateAndTimeReversed = false;
  let createdAtDateAndTimeActive = false;
  let updatedAtDateAndTimeReversed = false;
  let updatedAtDateAndTimeActive = false;
  let contentIsEdited = false;
  async function getClientsList(searchParams = '') {
    const response = await fetch(
      `http://localhost:3000/api/clients/${searchParams}`,
    );
    const clientsListBase = await response.json();
    return clientsListBase;
  }
  async function initialLoad() {
    const spinnerMain = document.createElement('div');
    spinnerMain.classList.add('spinner-border');
    spinnerMain.classList.add('main-spinner');
    spinnerMain.classList.add('text-primary');
    document.querySelector('.main__content-table').append(spinnerMain);
    const clientsListBase = await getClientsList(searchStringParam);
    const clientsList = [];
    let index = 0;
    function contactFind(i) {
      const recId = i.id;
      let contactsList = '';
      for (const a of i.contacts) {
        if (a.type === 'Phone') {
          contactsList += `<button class="tooltip-button phone id${recId}"
        data-bs-toggle="tooltip" data-bs-html="false" data-bs-placement= "top" title="Телефон: ${a.value}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
        <circle cx="8" cy="8" r="8" fill="#9873FF"/>
        <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
        </g>
        </svg>
          </button>`;
        } else if (a.type === 'Email') {
          contactsList += `<button class="tooltip-button email id${recId}"
          data-bs-toggle="tooltip" data-bs-html="false" data-bs-placement= "top" title="Email: ${a.value}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
          </svg>
            </button>`;
        } else if (a.type === 'FB') {
          contactsList += `<button class="tooltip-button facebook id${recId}"
          data-bs-toggle="tooltip" data-bs-html="false" data-bs-placement= "top" title="Facebook: ${a.value}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.7" d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
          </svg>
            </button>`;
        } else if (a.type === 'VK') {
          contactsList += `<button class="tooltip-button vk id${recId}"
        data-bs-toggle="tooltip" data-bs-html="false" data-bs-placement= "top" title="VK: ${a.value}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
        </svg>
          </button>`;
        } else {
          contactsList += `<button class="tooltip-button other id${recId}"
        data-bs-toggle="tooltip" data-bs-html="false" data-bs-placement= "top" title="${a.type}: ${a.value}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
        </svg>
        </button>`;
        }
      }
      return contactsList;
    }
    for (const i of clientsListBase) {
      clientsList[index] = {
        id: i.id,
        fio: `${i.surname} ${i.name} ${i.lastName}`,
        createdAtDate: i.createdAt.slice(0, 10).split('-').reverse().join('.'),
        createdAtTime: i.createdAt.slice(11, 16),
        createdAtDateAndTime: new Date(i.createdAt),
        updatedAtDate: i.updatedAt.slice(0, 10).split('-').reverse().join('.'),
        updatedAtTime: i.updatedAt.slice(11, 16),
        updatedAtDateAndTime: new Date(i.updatedAt),
        contact: contactFind(i),
      };
      ++index;
    }
    spinnerMain.remove();
    return clientsList;
  }
  async function getList() {
    ClientsList = await initialLoad();
    return ClientsList;
  }

  async function tableRefresh() { // Перегрузка таблицы после манипуляций с данными.
    ClientsList = await getList();
    clearTable();
    buildTable(ClientsList);
    sortId(idReversed);
  }

  function deleteRecord(id, btnDelete) {
    const modalWindow = new bootstrap.Modal(document.getElementById('modal-delete'));
    const modalWindowDelete = document.getElementById('modal-delete');
    modalWindowDelete.addEventListener('hide.bs.modal', closeModal);
    const delBtn = document.querySelector('.modal-delete-footer__button-delete');

    function closeModal() {
      modalWindowDelete.removeEventListener('hide.bs.modal', closeModal);
      delBtn.removeEventListener('click', deleteRec);
      removeSpinner(btnDelete);
    }

    addSpinner(btnDelete);

    async function deleteRec() {
      response = await fetch(
        `http://localhost:3000/api/clients/${id}`,
        {
          method: 'DELETE',
        },
      );
      modalWindow.hide();
      tableRefresh();
    }

    modalWindow.show();
    delBtn.addEventListener('click', deleteRec);
  }

  async function buildTable(cl) {
    for (const i of cl) {
      const tableRow = document.createElement('tr');
      const tableId = document.createElement('td');
      const tableFullName = document.createElement('td');
      const tableDateOfCreation = document.createElement('td');
      const tableTimeOfCreation = document.createElement('td');
      const tableDateOfUpdate = document.createElement('td');
      const tableTimeOfUpdate = document.createElement('td');
      const tableContacts = document.createElement('td');
      const tableActions = document.createElement('td');
      const btnChange = document.createElement('button');
      const btnDelete = document.createElement('button');
      const spinnerOnChange = document.createElement('span');
      const spinnerOnDelete = document.createElement('span');
      btnChange.classList.add('button-change');
      btnChange.classList.add('action-button');
      btnChange.type = 'button';
      btnDelete.classList.add('button-delete');
      btnDelete.classList.add('action-button');
      btnDelete.type = 'button';
      btnDelete.textContent = 'Удалить';
      btnChange.textContent = 'Изменить';
      spinnerOnChange.classList.add('text-primary');
      spinnerOnChange.style.marginRight = '5px';
      spinnerOnDelete.style.marginRight = '5px';
      spinnerOnChange.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10.5V13H2.5L9.87333 5.62662L7.37333 3.12662L0 10.5ZM11.8067 3.69329C12.0667 3.43329 12.0667 3.01329 11.8067 2.75329L10.2467 1.19329C9.98667 0.933291 9.56667 0.933291 9.30667 1.19329L8.08667 2.41329L10.5867 4.91329L11.8067 3.69329Z" fill="#9873FF"/>
      </svg>`;
      spinnerOnDelete.classList.add('text-danger');
      spinnerOnDelete.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/>
      </svg>`;
      btnChange.prepend(spinnerOnChange);
      btnDelete.prepend(spinnerOnDelete);
      tableRow.classList.add('table__row');
      tableId.classList.add('table__id');
      tableFullName.classList.add('table__fio');
      tableDateOfCreation.classList.add('table__date-of-creation');
      tableTimeOfCreation.classList.add('table__time-of-creation');
      tableDateOfUpdate.classList.add('table__date-of-update');
      tableTimeOfUpdate.classList.add('table__time-of-update');
      tableContacts.classList.add('table__contacts');
      tableActions.classList.add('table__actions');
      tableId.textContent = i.id;
      tableFullName.textContent = i.fio;
      tableDateOfCreation.innerHTML = i.createdAtDate;
      tableTimeOfCreation.innerHTML = ` <p class = 'timerecord'> ${i.createdAtTime}  </p>`;
      tableDateOfCreation.innerHTML += tableTimeOfCreation.innerHTML;
      tableDateOfUpdate.innerHTML = i.updatedAtDate;
      tableTimeOfUpdate.innerHTML = ` <p class = 'timerecord'> ${i.updatedAtTime}  </p>`;
      tableDateOfUpdate.innerHTML += tableTimeOfUpdate.innerHTML;
      tableContacts.innerHTML = i.contact;
      tableActions.append(btnChange);
      tableActions.append(btnDelete);
      tableBody.append(tableRow);
      tableRow.append(tableId);
      tableRow.append(tableFullName);
      tableRow.append(tableDateOfCreation);
      tableRow.append(tableDateOfUpdate);
      tableRow.append(tableContacts);
      tableRow.append(tableActions);
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]'),
      );
      // ----Обработка иконок в случае, если их больше 4-х в строке
      const iconCount = document.querySelectorAll(`.id${i.id}`);
      if (iconCount.length > 4) {
        for (let nodeIndex = 4; nodeIndex < iconCount.length; ++nodeIndex) {
          iconCount[nodeIndex].style.display = 'none';
        }
        const showMoreBtn = document.createElement('button');
        showMoreBtn.classList.add('tooltip-button');
        showMoreBtn.classList.add('show-more-button');
        showMoreBtn.textContent = `+${iconCount.length - 4}`;
        iconCount[4].before(showMoreBtn);
        showMoreBtn.addEventListener('click', (() => {
          showMoreBtn.remove();
          iconCount.forEach((el) => {
            el.style.display = '';
          });
        }));
      }

      // eslint-disable-next-line no-loop-func
      // eslint-disable-next-line no-unused-vars
      const tooltipList = tooltipTriggerList.map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
      );
      btnChange.addEventListener('click', () => {
        buildModalWindow(i.id, btnChange);
        addSpinner(btnChange);
      });
      btnDelete.addEventListener('click', () => {
        deleteRecord(i.id, btnDelete);
      });
    }
  }

  function clearTable() {
    const rows = document.querySelectorAll('.table__row');
    rows.forEach((e) => e.remove());
  }

  function addSpinner(parentButton) {
    if (parentButton) {
      parentButton.firstElementChild.innerHTML = '';
      parentButton.firstElementChild.classList.add('spinner-border');
      parentButton.firstElementChild.classList.add('spinner-border-sm');
    }
  }

  function removeSpinner(parentButton) {
    if (parentButton) {
      parentButton.firstElementChild.classList.remove('spinner-border');
      parentButton.firstElementChild.classList.remove('spinner-border-sm');
      if (parentButton.classList[0].includes('button-change')) {
        parentButton.firstElementChild.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10.5V13H2.5L9.87333 5.62662L7.37333 3.12662L0 10.5ZM11.8067 3.69329C12.0667 3.43329 12.0667 3.01329 11.8067 2.75329L10.2467 1.19329C9.98667 0.933291 9.56667 0.933291 9.30667 1.19329L8.08667 2.41329L10.5867 4.91329L11.8067 3.69329Z" fill="#9873FF"/>
      </svg>`;
      }
      if (parentButton.classList[0].includes('button-delete')) {
        parentButton.firstElementChild.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/>
      </svg>`;
      }
    }
  }

  /* Сортировка */
  function sortId(reverseFlag) {
    if (reverseFlag === false) {
      ClientsList.sort((a, b) => {
        if (Number(a.id) > Number(b.id)) {
          return 1;
        }
        if (Number(a.id) < Number(b.id)) {
          return -1;
        }
        return 0;
      });
    }
    if (reverseFlag === true) {
      ClientsList.sort((a, b) => {
        if (Number(a.id) < Number(b.id)) {
          return 1;
        }
        if (Number(a.id) > Number(b.id)) {
          return -1;
        }
        return 0;
      });
    }
    clearTable();
    buildTable(ClientsList);
  }

  function sortFio(reverseFlag) {
    if (reverseFlag === false) {
      ClientsList.sort((a, b) => {
        if (a.fio > b.fio) {
          return 1;
        }
        if (a.fio < b.fio) {
          return -1;
        }
        return 0;
      });
    }
    if (reverseFlag === true) {
      ClientsList.sort((a, b) => {
        if (a.fio < b.fio) {
          return 1;
        }
        if (a.fio > b.fio) {
          return -1;
        }
        return 0;
      });
    }
    clearTable();
    buildTable(ClientsList);
  }

  function sortCreatedAt(reverseFlag) {
    if (reverseFlag === false) {
      ClientsList.sort((a, b) => {
        if (a.createdAtDateAndTime > b.createdAtDateAndTime) {
          return 1;
        }
        if (a.createdAtDateAndTime < b.createdAtDateAndTime) {
          return -1;
        }
        return 0;
      });
    }
    if (reverseFlag === true) {
      ClientsList.sort((a, b) => {
        if (a.createdAtDateAndTime < b.createdAtDateAndTime) {
          return 1;
        }
        if (a.createdAtDateAndTime > b.createdAtDateAndTime) {
          return -1;
        }
        return 0;
      });
    }
    clearTable();
    buildTable(ClientsList);
  }

  function sortUpdatedAt(reverseFlag) {
    if (reverseFlag === false) {
      ClientsList.sort((a, b) => {
        if (a.updatedDateAndTime > b.updatedAtDateAndTime) {
          return 1;
        }
        if (a.updatedAtDateAndTime < b.updatedAtDateAndTime) {
          return -1;
        }
        return 0;
      });
    }
    if (reverseFlag === true) {
      ClientsList.sort((a, b) => {
        if (a.updatedAtDateAndTime < b.updatedAtDateAndTime) {
          return 1;
        }
        if (a.updatedAtDateAndTime > b.updatedAtDateAndTime) {
          return -1;
        }
        return 0;
      });
    }
    clearTable();
    buildTable(ClientsList);
  }

  idButton.addEventListener('click', () => {
    buttons.forEach((el) => {
      el.classList.remove('table__header-button-button-active');
      el.classList.remove('increment');
    });
    fioReversed = false;
    fioActive = false;
    createdAtDateAndTimeActive = false;
    createdAtDateAndTimeReversed = false;
    updatedAtDateAndTimeActive = false;
    updatedAtDateAndTimeReversed = false;
    idButton.classList.add('table__header-button-button-active');
    if (idActive === false) {
      idReversed = false;
      idActive = true;
      idButton.classList.add('increment');
    } else if (idReversed === false) {
      idReversed = true;
      idActive = true;
      idButton.classList.remove('increment');
    } else {
      idReversed = false;
      idButton.classList.add('increment');
      idActive = true;
    }
    sortId(idReversed);
  });

  fioButton.addEventListener('click', () => {
    buttons.forEach((el) => {
      el.classList.remove('table__header-button-button-active');
      el.classList.remove('increment');
    });
    fioButton.classList.add('table__header-button-button-active');
    idReversed = false;
    idActive = false;
    createdAtDateAndTimeActive = false;
    createdAtDateAndTimeReversed = false;
    updatedAtDateAndTimeActive = false;
    updatedAtDateAndTimeReversed = false;
    if (fioActive === false) {
      fioReversed = false;
      fioActive = true;
      fioButton.classList.add('increment');
    } else if (fioReversed === false) {
      fioReversed = true;
      fioActive = true;
      fioButton.classList.remove('increment');
    } else {
      fioReversed = false;
      fioActive = true;
      fioButton.classList.add('increment');
    }
    sortFio(fioReversed);
  });

  createdAtButton.addEventListener('click', () => {
    buttons.forEach((el) => {
      el.classList.remove('table__header-button-button-active');
      el.classList.remove('increment');
    });
    createdAtButton.classList.add('table__header-button-button-active');
    idReversed = false;
    idActive = false;
    fioActive = false;
    fioReversed = false;
    updatedAtDateAndTimeActive = false;
    updatedAtDateAndTimeReversed = false;
    if (createdAtDateAndTimeActive === false) {
      createdAtDateAndTimeReversed = false;
      createdAtDateAndTimeActive = true;
      createdAtButton.classList.add('increment');
    } else if (createdAtDateAndTimeReversed === false) {
      createdAtDateAndTimeReversed = true;
      createdAtDateAndTimeActive = true;
      createdAtButton.classList.remove('increment');
    } else {
      createdAtDateAndTimeReversed = false;
      createdAtDateAndTimeActive = true;
      createdAtButton.classList.add('increment');
    }
    sortCreatedAt(createdAtDateAndTimeReversed);
  });

  updatedAtButton.addEventListener('click', () => {
    buttons.forEach((el) => {
      el.classList.remove('table__header-button-button-active');
      el.classList.remove('increment');
    });
    updatedAtButton.classList.add('table__header-button-button-active');
    idReversed = false;
    idActive = false;
    fioActive = false;
    fioReversed = false;
    createdAtDateAndTimeActive = false;
    createdAtDateAndTimeReversed = false;
    if (updatedAtDateAndTimeActive === false) {
      updatedAtDateAndTimeReversed = false;
      updatedAtDateAndTimeActive = true;
      updatedAtButton.classList.add('increment');
    } else if (updatedAtDateAndTimeReversed === false) {
      updatedAtDateAndTimeReversed = true;
      updatedAtDateAndTimeActive = true;
      updatedAtButton.classList.remove('increment');
    } else {
      updatedAtDateAndTimeReversed = false;
      updatedAtDateAndTimeActive = true;
      updatedAtButton.classList.add('increment');
    }
    sortUpdatedAt(updatedAtDateAndTimeReversed);
  });

  /* --------------------Модальное окно ----------------*/
  async function buildModalWindow(id = '', btnChange) {
    const modalHeader = document.querySelector('.modal-title');
    const inputSurname = document.querySelector('.surname-input');
    const inputName = document.querySelector('.name-input');
    const inputMiddleName = document.querySelector('.middlename-input');
    const addContactBtn = document.querySelector('.client__add-contact');
    let errMsg = document.querySelector('.modal__error-message'); // Находим сообщения об ошибках
    const modalFooter = document.querySelector('.modal-footer');
    const saveBtn = document.querySelector(
      '.modal-footer__button-save-changes',
    );
    clearForm();
    if (id === '') {
      modalHeader.textContent = 'Новый клиент';
      const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('modal-footer__button-cancel');
      cancelBtn.classList.add('button-cancel');
      cancelBtn.classList.add('bottom-button');
      cancelBtn.textContent = 'Отмена';
      cancelBtn.dataset.bsDismiss = 'modal';
      modalFooter.append(cancelBtn);
    } else {
      modalHeader.textContent = 'Изменить данные';
      const idHeader = document.createElement('span');
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn');
      deleteButton.classList.add('modal-footer__button-delete');
      deleteButton.classList.add('bottom-button');
      deleteButton.textContent = 'Удалить клиента';
      idHeader.classList.add('modal-title__id');
      idHeader.textContent = `ID: ${id}`;
      modalHeader.append(idHeader);
      idHeader.style.marginLeft = '10px';
      modalFooter.append(deleteButton);
      const currentRecord = await getClientsList(id);
      inputSurname.value = currentRecord.surname;
      inputName.value = currentRecord.name;
      inputMiddleName.value = currentRecord.lastName;
      contentIsEdited = true;
      deleteButton.addEventListener('click', deleteFromForm);
      for (i of currentRecord.contacts) {
        addContact(i.type, i.value);
      }
      removeSpinner(btnChange);
    }
    const modalWindow = new bootstrap.Modal(document.getElementById('modal'));
    modalWindow.show();
    const modalWindowOpen = document.getElementById('modal');
    modalWindowOpen.addEventListener('hide.bs.modal', closeModal);
    const bottomBtn = document.querySelector('.bottom-button');

    function closeModal() {
      // Закрытие окна по нажатию на отмену, ESC или вне окна
      modalWindowOpen.removeEventListener('hide.bs.modal', closeModal);
      clearForm();
      checkDeleteButton();
      contentIsEdited = false;
      if (errMsg) {
        errMsg.remove();
      }
      saveBtn.removeEventListener('click', submit);
      addContactBtn.removeEventListener('click', addContact);
      bottomBtn.remove();
      tableRefresh();
    }

    async function deleteFromForm(delElem) {
      delElem.preventDefault();
      modalWindow.hide();
      deleteRecord(id);
    }

    function addContact(typeOfContact = '', valueOfContact = '') {
      let typeOfContactString;
      // Нажали на кнопку добавить контакт или разбираем существующие контакты из базы
      if (typeOfContact.isTrusted === true) {
        typeOfContactString = '';
      } else {
        typeOfContactString = typeOfContact;
      }
      const modalWrap = document.createElement('div');
      const modalSelector = document.createElement('select');
      const selectorOptionPhone = document.createElement('option');
      const selectorOptionEmail = document.createElement('option');
      const selectorOptionFb = document.createElement('option');
      const selectorOptionVk = document.createElement('option');
      const selectorOptionOther = document.createElement('option');
      const selectorInput = document.createElement('input');
      const deleteContact = document.createElement('button');
      deleteContact.classList.add('contacts-selector__delete');
      deleteContact.classList.add('tooltip-button');
      deleteContact.type = 'button';
      deleteContact.dataset.bsToggle = 'tooltipdelete';
      deleteContact.dataset.bsHtml = 'false';
      deleteContact.dataset.bsPlacement = 'top';
      deleteContact.dataset.bsTrigger = 'hover';
      deleteContact.title = 'Удалить контакт';
      modalWrap.classList.add('modal-body__contacts-selector-wrap');
      modalSelector.classList.add('modal-body__contacts-selector');
      selectorInput.classList.add('modal-body__contacts-value');
      selectorInput.type = 'text';
      selectorInput.placeholder = 'Введите данные контакта';
      selectorInput.value = valueOfContact;
      selectorOptionPhone.value = 'Phone';
      selectorOptionPhone.textContent = 'Телефон';
      selectorOptionEmail.value = 'Email';
      selectorOptionEmail.textContent = 'Email';
      selectorOptionFb.value = 'FB';
      selectorOptionFb.textContent = 'Facebook';
      selectorOptionVk.value = 'VK';
      selectorOptionVk.textContent = 'VK';
      selectorOptionOther.value = 'Other';
      selectorOptionOther.textContent = 'Другое';
      switch (typeOfContactString) {
        case 'Phone':
          selectorOptionPhone.selected = true;
          break;
        case 'Email':
          selectorOptionEmail.selected = true;
          break;
        case 'FB':
          selectorOptionFb.selected = true;
          break;
        case 'VK':
          selectorOptionVk.selected = true;
          break;
        case 'Other':
          selectorOptionOther.selected = true;
          break;
        case '':
          selectorOptionPhone.selected = true;
          break;
        default:
          selectorOptionOther.selected = true;
      }
      modalSelector.append(selectorOptionPhone);
      modalSelector.append(selectorOptionEmail);
      modalSelector.append(selectorOptionFb);
      modalSelector.append(selectorOptionVk);
      modalSelector.append(selectorOptionOther);
      modalWrap.append(modalSelector);
      modalWrap.append(selectorInput);
      modalWrap.append(deleteContact);
      modalBody.prepend(modalWrap);
      const choiceElement = document.querySelector(
        '.modal-body__contacts-selector',
      );
      // eslint-disable-next-line no-unused-vars
      const choices = new Choices(choiceElement, {
        searchChoices: false,
        searchEnabled: false,
        allowHTML: false,
        shouldSort: false,
        position: 'bottom',
        itemSelectText: '',
      });

      const tooltipDelete = new bootstrap.Tooltip(
        document.querySelector('[data-bs-toggle="tooltipdelete"]'),
      );
      // Считаем количество выведенных полей контактов
      let numberOfContacts = document.querySelectorAll('.modal-body__contacts-selector-wrap').length;
      deleteContact.addEventListener('click', () => {
        tooltipDelete.hide();
        modalWrap.remove();
        // При нажатии на кнопку удаления контакта - обновляем количество контактов.
        // Если кнопка была убрана и контактов меньше 10 - показываем кнопку
        numberOfContacts = document.querySelectorAll('.modal-body__contacts-selector-wrap').length;
        if (numberOfContacts < 10 && addContactBtn.style.display === 'none') {
          addContactBtn.style.display = 'inline';
        }
      });
      // Если контактов 10 - убираем кнопку.
      if (numberOfContacts === 10) {
        addContactBtn.style.display = 'none';
      }
    }

    function clearForm() {
      inputName.value = '';
      inputSurname.value = '';
      inputMiddleName.value = '';
      document
        .querySelectorAll('.modal-body__contacts-selector-wrap')
        .forEach((el) => {
          el.remove();
        });
    }

    function checkDeleteButton() {
      const deleteButton = document.querySelector('.modal-footer__button-delete');
      if (deleteButton) {
        deleteButton.remove();
      }
    }

    async function submit() {
      // Нажали на кнопку сохранить
      const contactType = document.querySelectorAll(
        '.modal-body__contacts-selector',
      );
      const contactsValue = document.querySelectorAll(
        '.modal-body__contacts-value',
      );
      function getContactsList() {
        // разбираем контакты
        const contactsList = [];
        for (let i = 0; i < contactType.length; i++) {
          const contact = {
            type: contactType[i].value,
            value: contactsValue[i].value,
          };
          contactsList.push(contact);
        }
        return contactsList;
      }
      const record = {
        name: inputName.value,
        surname: inputSurname.value,
        lastName: inputMiddleName.value,
        contacts: getContactsList(),
      };

      function prepareErrorMessage() {
        if (errMsg) { // Если уже были старые сообщения - убираем их
          errMsg.remove();
        }
        errMsg = document.createElement('p');
        errMsg.classList.add('modal__error-message');
      }
      let validated = true;
      let errorMessages = '';
      const regMask = /^[А-Я а-я ёЁ a-zA-Z]+$/;

      if (record.name.length === 0) {
        errorMessages += 'Нет имени<br>';
        validated = false;
        const nameBottomLine = document.querySelector('.name-input');
        nameBottomLine.style.borderBottomColor = 'red';
        nameBottomLine.addEventListener('input', (() => {
          nameBottomLine.style.borderBottomColor = 'rgba(200, 197, 209, 0.5)';
        }));
      } else
      if (!regMask.exec(record.name)) {
        errorMessages += 'Недопустимый формат имени<br>';
        validated = false;
        const nameBottomLine = document.querySelector('.name-input');
        nameBottomLine.style.borderBottomColor = 'red';
        nameBottomLine.addEventListener('input', (() => {
          nameBottomLine.style.borderBottomColor = 'rgba(200, 197, 209, 0.5)';
        }));
      }

      if (record.surname.length === 0) {
        errorMessages += 'Нет фамилии<br>';
        validated = false;
        const surnameBottomLine = document.querySelector('.surname-input');
        surnameBottomLine.style.borderBottomColor = 'red';
        surnameBottomLine.addEventListener('input', (() => {
          surnameBottomLine.style.borderBottomColor = 'rgba(200, 197, 209, 0.5)';
        }));
      } else

      if (!regMask.exec(record.surname)) {
        errorMessages += 'Недопустимый формат фамилии<br>';
        validated = false;
        const surnameBottomLine = document.querySelector('.surname-input');
        surnameBottomLine.style.borderBottomColor = 'red';
        surnameBottomLine.addEventListener('input', (() => {
          surnameBottomLine.style.borderBottomColor = 'rgba(200, 197, 209, 0.5)';
        }));
      }

      for (const index of record.contacts) {
        if (index.value.length === 0) {
          errorMessages += 'Пустоe поле контакта<br>';
          validated = false;
          const contactBottomLine = document.querySelector('.modal-body__contacts-value');
          contactBottomLine.style.border = 'none';
          contactBottomLine.style.border = '1px solid gray';
          contactBottomLine.style.borderBottom = '1px solid red';
          contactBottomLine.addEventListener('input', (() => {
            contactBottomLine.style.borderBottomColor = 'gray';
          }));
        }
      }

      if (!validated) {
        prepareErrorMessage();
        errMsg.innerHTML = errorMessages;
        saveBtn.before(errMsg);
      }

      if (validated) { // Приводим введенные значения к единому виду
        record.name = record.name.trim();
        record.name = record.name.substring(0, 1).toUpperCase()
        + record.name.substring(1, record.name.length).toLowerCase().trim();
        record.surname = record.surname.trim();
        record.surname = record.surname.substring(0, 1).toUpperCase()
        + record.surname.substring(1, record.surname.length).toLowerCase();
        record.lastName = record.lastName.trim();
        record.lastName = record.lastName.substring(0, 1).toUpperCase()
        + record.lastName.substring(1, record.lastName.length).toLowerCase();
      }

      if (validated) {
        if (contentIsEdited) {
          try {
            addSpinner(saveBtn);
            response = await fetch(
              `http://localhost:3000/api/clients/${id}`,
              {
                method: 'PATCH',
                body: JSON.stringify(record),
                headers: {
                  'Content-type': 'application/JSON',
                },
              },
            );
            removeSpinner(saveBtn);
          } catch (e) {
            serverDownMsg = `Сервер недоступен: ${e.message}`;
          }
        } else {
          try {
            addSpinner(saveBtn);
            response = await fetch(
              'http://localhost:3000/api/clients',
              {
                method: 'POST',
                body: JSON.stringify(record),
                headers: {
                  'Content-type': 'application/JSON',
                },
              },
            );
            removeSpinner(saveBtn);
          } catch (e) {
            serverDownMsg = `Сервер недоступен: ${e.message}`;
          }
        }
        /* Работа с ошибками */

        if (serverDownMsg) {
          prepareErrorMessage();
          errMsg.textContent = serverDownMsg;
          serverDownMsg = '';
          saveBtn.before(errMsg);
        } else
        if (response.status === 422 || response.status === 404 || response.status === 500) {
          prepareErrorMessage();
          errMsg.textContent = `Ошибка ${response.status}: ${response.statusText}`;
          saveBtn.before(errMsg);
        } else if (response.status === 201 || response.status === 200) {
          modalWindow.hide();
        } else {
          prepareErrorMessage();
          errMsg.textContent = 'Ошибка: что-то пошло не так...';
          saveBtn.before(errMsg);
        }
      }
    }
    addContactBtn.addEventListener('click', addContact);
    saveBtn.addEventListener('click', submit);
  }

  async function searchRecord() {
    // Поиск
    let searchString = [];
    const searchValue = searchInput.value.trim().split(' ');
    for (const i of searchValue) {
      if (i !== '') {
        // убираем лишние пробелы в запросе
        searchString.push(i);
      }
    }
    for (i in searchString) {
      searchString[i] = searchString[i].substring(0, 1).toUpperCase()
        + searchString[i].substring(1, searchString[i].length).toLowerCase();
    }
    if (searchString.length > 0) {
      searchStringParam = `?search=${searchString.join(' ')}`;
      searchString = [];
    } else {
      // Если обнулили запрос, обнуляем переменную
      searchStringParam = '';
    }
    tableRefresh();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    let timeout;
    tableRefresh();
    addNewClientButton.addEventListener('click', () => {
      buildModalWindow();
    });
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(searchRecord, 500);
    });
  });
})();
