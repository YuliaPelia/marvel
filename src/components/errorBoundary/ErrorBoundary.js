// запобіжники - це класові компоненти, які обгортають інші компненти і якщо в їх дочірніх компонентах виникає помилка тоді запобіжники будуть її ловити,
// при цьому додаток падати не буде, а зламається лише цей компонент
// запобіжники ловлять помилки не всюди, а тільки:
// 1) При запуску методу render()
// 2) В методах життєвого циклу
// 3) Конструкторах дочірніх компонентів (компонентів, які були передані всередину)

// помилки, які запобіжники не ловлять:
// 1) Помилки, які виникли всередині обробників подій (тому що не знати коли ця операція закінчиться)
// 2) Асинхронний код (тому що не знати коли ця операція закінчиться)
// 3) В запобіжнику
// 4) Серверний рендеринг

import { Component } from "react";
import ErrorMessage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }


    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        // якщо this.state.error буде true
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;