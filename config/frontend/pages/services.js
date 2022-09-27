import React from "react";
import { getProps } from "@builtjs/site";
import Error from "next/error";
import { withRouter } from "next/router";
import SEO from "@/templates/head/seo/seo";
import Banner1 from "@/templates/banners/banner-1/banner-1";
import Block3 from "@/templates/blocks/block-3/block-3";
import Cover3 from "@/templates/covers/cover-3/cover-3";
import Layout from "@/layout/layout";

const Page = (props) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
     <>
	<SEO content={props.servicesSeoContent} />
		<Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <Cover3 content={props.servicesLandingContent} />
			 <Block3 content={props.servicesBlockContent} />
			 <Banner1 content={props.contactTeaserContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export async function getStaticProps() {
  let props = await getProps({pageSlug: 'service'});
  return {
    props: props,
    revalidate: 10
  };
}