const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AboutUs } from "./pages/About.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Books } from "./pages/Books.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { EditBook } from "./pages/EditBook.jsx"
import { Home } from "./pages/Home.jsx"
import { NotFound } from "./pages/NotFound.jsx"

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/About" element={<AboutUs />}></Route>

                            <Route path="/Books" element={<Books />}></Route>
                            <Route path="/Books/edit/:bookID" element={<EditBook />}></Route>
                            <Route path="/Books/edit/" element={<EditBook />}></Route>
                            <Route path="/Books/:bookID" element={<BookDetails />}></Route>

                            <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Home />
                </main>
            </section>
        </Router>
    )
}