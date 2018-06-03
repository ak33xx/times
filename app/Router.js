"use strict"
module.exports = [

    {
        path: '/',
        handler:rootRequire('app/routes/indexRoutes')
    },
    {
        path: '/',
        handler:rootRequire('app/routes/coluprouter')
    },
    {
        path:'/',
        handler:rootRequire('app/routes/photoRoutes')
    },
    {
        path : '/',
        handler:rootRequire('app/routes/registerRoutes')
    },
    {
        path :'/',
        handler : rootRequire('/app/routes/loginRoutes')
    },
    {
        path:'/',
        handler: rootRequire('/app/routes/logoutRoutes')
    },
    {
        path: '/',
        handler: rootRequire('/app/routes/editionRoutes')
    },
    {
        path:'/',
        handler: rootRequire('/app/routes/galleryRoutes')
    },
     {
        path:'/',
        handler: rootRequire('/app/routes/aboutRoutes')
    },
     {
        path:'/',
        handler: rootRequire('/app/routes/blogRoutes')
    },
     {
        path:'/',
        handler: rootRequire('/app/routes/teamRoutes')
    },
         {
        path:'/',
        handler: rootRequire('/app/routes/contactRoutes')
    },
    {
        path:'/',
        handler: rootRequire('/app/routes/bioRoutes')
    },
    {
        path:'/',
        handler: rootRequire('/app/routes/tagRoutes')
    }


];
