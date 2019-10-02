import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import './nav.module.less';

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT', key: '' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub', key: '' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

interface NavInterface {
  title: string;
}

const Nav: React.SFC<NavInterface> = props => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>{props.title}</a>
        </Link>
        <Button className="btn" type="primary">
          Button
        </Button>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
          <Button type="danger">Button</Button>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default Nav;
