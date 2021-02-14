'use strict';

//  Выход из личного кабинета.

const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout(response => {
        if (response.success)
        return location.reload();
    });
}

//  Получение информации о пользователе.

ApiConnector.current(response => {
    if (response.success)
    return ProfileWidget.showProfile(response.data);
});

//  Получение текущих курсов валюты.

const rates = new RatesBoard();
function exchangRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            rates.clearTable();
            rates.fillTable(response.data);
        }
    });
}
exchangRates();
setInterval(exchangRates, 60000);

//  Операции с деньгами.

const money = new MoneyManager();

//  Пополнение баланса.

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Операция успешно выполнена!");
        }
        else {
            money.setMessage(response.success, response.error);
        }
    });
}

//  Конвертирование валюты.

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Операция успешно выполнена!");
        }
        else {
            money.setMessage(response.success, response.error);
        }
    });
}

//  Перевод валюты.

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Операция успешно выполнена!");
        }
        else {
            money.setMessage(response.success, response.error);
        }
    });
}

//  Работа с избранным.

const favorites = new FavoritesWidget();

//  Отрисовка начального списка избранного.

ApiConnector.getFavorites(response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});

//  Добавление в список избранного.

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            favorites.setMessage(response.success, "Операция успешно выполнена!");
        }
        else {
            favorites.setMessage(response.success, response.error);
        }
    });
}

//  Удаление из списка избранного.

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            favorites.setMessage(response.success, "Операция успешно выполнена!");
        }
        else {
            favorites.setMessage(response.success, response.error);
        }
    });
}