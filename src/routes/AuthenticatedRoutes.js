import React from 'react';
import { AuthenticatedRoutesNames } from '../utilities/util.constant';
import {Route,Routes} from "react-router-dom";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import AdminCategories from "../pages/admin/categories/AdminCategories";
import AddEditCategory from '../pages/admin/categories/AddEditCategory';

function AuthenticatedRoutes(){
    return (
        <Routes>
            <Route element={<AdminLayout/>}>
                <Route path={AuthenticatedRoutesNames.HOME} element={<AdminHome/>}/>
                 <Route path={AuthenticatedRoutesNames.CATEGORIES }element={<AdminCategories/>}/>
                 <Route path={AuthenticatedRoutesNames.CATEGORY_ADD} element={<AddEditCategory/>}/>
                 <Route path={AuthenticatedRoutesNames.CATEGORY_EDIT} element={<AddEditCategory/>}/>
                 {/* <Route path={AuthenticatedRoutesNames.POSTS}  element={<AdminPosts/>}/> */}
            </Route>
        </Routes>
    )
    
}
export default AuthenticatedRoutes;