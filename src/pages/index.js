import React, { useEffect, useState } from 'react';  
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [status, setStatus] = useState({ title1: '', title2: '' }); // State for service status
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Fetch the status from the API
    Promise.all([
      fetch('https://status.teamatlas.dev/api/badge/1/status?style=for-the-badge').then(response => response.text()),
      fetch('https://status.teamatlas.dev/api/badge/12/status?style=for-the-badge').then(response => response.text())
    ])
      .then(([html1, html2]) => {
        // Parse HTML to extract the title
        const parser = new DOMParser();
        const doc1 = parser.parseFromString(html1, 'text/html');
        const doc2 = parser.parseFromString(html2, 'text/html');
        const title1 = doc1.querySelector('title').textContent;
        const title2 = doc2.querySelector('title').textContent;
        setStatus({
          title1,
          title2
        });
        setLoading(false); // Data is fetched, set loading to false
      })
      .catch(error => {
        console.error('Error fetching status:', error);
        setStatus({ title1: 'Horizon Core is offline', title2: 'Documentation is offline' }); // Default on error
        setLoading(false); // Error occurred, set loading to false
      });
  }, []);

  // Determine the status class
  const statusClass1 = status.title1 === 'STATUS: UP' ? 'statusGreen' : 'statusRed';
  const statusMessage1 = status.title1 === 'STATUS: UP' ? 'Horizon Services are online' : 'Horizon Services are offline';

  const statusClass2 = status.title2 === 'STATUS: UP' ? 'statusGreen' : 'statusRed';
  const statusMessage2 = status.title2 === 'STATUS: UP' ? 'Documentation is online' : 'Documentation is offline';

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={clsx(styles.heroContent)}>
        <Heading as="h1" className={clsx(styles.heroTitle)}>
          Welcome to Atlas Team!
          Develop dreams into reality.<br />
        </Heading>
        <p className={clsx(styles.heroSubtitle)}>
          Where ideas take flight and dreams become reality.
        </p>
        <div className={clsx(styles.buttons)}>
          <Link className={clsx(styles.button, styles.buttonPrimary)} href="https://support.teamatlas.dev">
            Community Server
          </Link>
          <Link className={clsx(styles.button, styles.buttonSecondary)} href="https://horizonbot.xyz">
            Visit Horizon
          </Link>
          <a href="mailto:info@teamatlas.dev" className={clsx(styles.emailButton)}>Contact</a> {/* Email button with emoji */}
        </div>
        <div className={clsx(styles.statusBox)}>
          <Link className={clsx(styles.viewMoreLink)} href="https://status.teamatlas.dev">
            All Status
          </Link>
          <div className={clsx(styles.statusIndicators)}>
            {loading ? (
              <div className={clsx(styles.loadingText)}>Loading...</div>
            ) : (
              <>
                <div className={clsx(styles.statusIndicator, styles[statusClass1])}>
                  <span className={clsx(styles.statusDot)}></span>
                  <span className={clsx(styles.statusText)}>{statusMessage1}</span>
                </div>
                <div className={clsx(styles.statusIndicator, styles[statusClass2])}>
                  <span className={clsx(styles.statusDot)}></span>
                  <span className={clsx(styles.statusText)}>{statusMessage2}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Welcome"
      description="Atlas, where ideas take flight and dreams become reality."
    >
      <HomepageHeader />
      <main>
        <div style={{ height: '4rem' }} />
      </main>
    </Layout>
  );
}
