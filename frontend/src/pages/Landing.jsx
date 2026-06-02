import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import DashboardPreview from '../components/landing/DashboardPreview';
import StatBar from '../components/landing/StatBar';
import BentoGrid from '../components/landing/BentoGrid';
import HowItWorks from '../components/landing/HowItWorks';
import ComparisonTable from '../components/landing/ComparisonTable';
import CTABand from '../components/landing/CTABand';
import Footer from '../components/landing/Footer';

const Landing = () => {
  return (
    <div className="landing-page-wrapper" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />
      <Hero />
      <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="mx-auto px-6 md:px-12" style={{ maxWidth: '1200px' }}>
          <DashboardPreview />
        </div>
      </div>
      <StatBar />
      <BentoGrid />
      <HowItWorks />
      <ComparisonTable />
      <CTABand />
      <Footer />
    </div>
  );
};

export default Landing;
