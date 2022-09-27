import Header1 from '@/templates/headers/header-1/header-1.js';
import Footer1 from '@/templates/footers/footer-1/footer-1.js';
const Layout = (props) => {
  const { children, headerContent, footerContent } = props;
  return (
    <>
      <Header1 content={props.headerContent} />

<main>{children}</main>
<Footer1 content={props.footerContent} />

    </>
  );
};

export default Layout;
