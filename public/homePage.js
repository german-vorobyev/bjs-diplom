"use strict"
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(res => {
        if (res.success === true) {
            location.reload();
        }
    });
}
ApiConnector.current(res => {
    if (res.success === true) {
        ProfileWidget.showProfile(res.data);
    }
});
const ratesBoard = new RatesBoard();
function loadStocks() {
    ApiConnector.getStocks(res => {
        if (res.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(res.data);
        } 
    });
}
loadStocks();
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, res => {
        if (res.success === true) {
            ProfileWidget.showProfile(res.data);
        }
        moneyManager.setMessage(res.success, res.error ? res.error : 'Успешно!');
    });
}
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, res => {
        if (res.success === true) {
            ProfileWidget.showProfile(res.data);
        }
        moneyManager.setMessage(res.success, res.error ? res.error : 'Успешно!');
    });
}
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, res => {
        if (res.success === true) {
            ProfileWidget.showProfile(res.data);
        }
        moneyManager.setMessage(res.success, res.error ? res.error : 'Успешно!');
    });
}
const favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites(res => {
    console.log(res);
    if (res.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(res.data);
        moneyManager.updateUsersList(res.data);
    }
});
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, res => {
        if (res.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
        }
        favoritesWidget.setMessage(res.success, res.error ? res.error : 'Успешно!');
    });
}
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, res => {
        if (res.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
        }
        favoritesWidget.setMessage(res.success, res.error ? res.error : 'Успешно!');
    });
}
setInterval(loadStocs, 60000);