import * as React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'
import './../styles/raster2.css'
import './../styles/style.css'

export const Layout = ({ isHomepage, children, navigation }) => (
  <>
    <main>
      <r-grid columns="8">
        <Header isHomepage={isHomepage} navigation={navigation} />
        {children}
        <Footer />
      </r-grid>
    </main>
  </>
)
