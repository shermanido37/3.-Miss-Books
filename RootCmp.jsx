const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { Home } from "./pages/Home.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { AboutTeam } from "./cmps/AboutTeam.jsx"
import { AboutGoal } from "./cmps/AboutGoal.jsx"
import { NotFound } from "./pages/NotFound.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

export function RootCmp() {
    return (
        <Router>
            <AppHeader />
            <main className="content-grid">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<AboutUs />} >
                        <Route path='/about/Team' element={<AboutTeam />} />
                        <Route path='/about/Goal' element={<AboutGoal />} />
                    </Route>
                    <Route path='/book' element={<BookIndex />} />
                    <Route path='/book/edit' element={<BookEdit />} />
                    <Route path='/book/edit/:bookId' element={<BookEdit />} />
                    <Route path='/book/:bookId' element={<BookDetails />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
            <UserMsg />
        </Router>
    )
}