import React, { useEffect } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, Link } from "gatsby";
import Layout from "@src/layouts/Layout";
import { MDXProvider } from "@mdx-js/react";
import 'katex/dist/katex.min.css'
import styled from "@emotion/styled";
import mediaqueries from "@src/styles/media";
import ContentTables from "@src/components/TableOfContent/TableOfContent";

/* ---custom MDX components--- */
import P from "@src/components/mdx/Paragraph";
import { H1, H2, H3, H4, H5, H6 } from "@src/components/mdx/Heading";
import ThematicBreak from "@src/components/mdx/ThematicBreak";
import Blockquote from "@src/components/mdx/Blockquote";
import List from "@src/components/mdx/List";
import UnorderedList from "@src/components/mdx/UnorderedList";
import CodeBlock from "@src/components/mdx/CodeBlock";
import Code from "@src/components/mdx/Code";

type Item = {
    url:string,
    title:string,
    index?:number,
    depth?:number
    items?:Array<Item>
};

type QueryProps = {
    mdx: {
        id: string,
        frontmatter: {
            title: string,
            description: string
        },
        tableOfContents: {
            items: Array<Item>
        },
        body: string
    }

}

const MDXTemplate = ({ data: { mdx }, children }: PageProps<QueryProps>) => {

    return (
        <Layout>
            <SiteContentWrapper>
                <SiteContent navOpen={false}>
                    <MDXProvider components={{
                        p: P,
                        h1: H1,
                        h2: H2,
                        h3: H3,
                        h4: H4,
                        h5: H5,
                        h6: H6,
                        hr: ThematicBreak,
                        blockquote: Blockquote,
                        ul: UnorderedList,
                        ol: List,
                        pre: CodeBlock,
                        code: Code
                    }}>
                        {children}
                    </MDXProvider>
                </SiteContent>
            </SiteContentWrapper>
            <ContentTables tableOfContents={mdx.tableOfContents.items}/>
        </Layout>
    ); 
} 


export const query = graphql`
query($id: String!) {
  mdx(id: {eq: $id}) {
    id
    body
    tableOfContents
    frontmatter {
      description
      title
    }
  }
}`;

const SiteContent = styled.main<{ navOpen: boolean }>`
    padding: 2rem 1rem 2rem;
    opacity: ${p => (p.navOpen ? 0.3 : 1)};
    transform: ${p => (p.navOpen ? `translateX(16rem)` : null)};
    width: 100%;
    ${mediaqueries.desktop_up`
        transform: translateX(0);
        opacity: 1;
        width: 90%
    `};
`;

const SiteContentWrapper = styled.div`
    flex-grow: 1;
    min-width: 20rem;
    display: flex;
    justify-content: center
`;

export default MDXTemplate;