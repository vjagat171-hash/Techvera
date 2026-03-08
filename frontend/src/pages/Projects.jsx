import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';
import {
  FaExternalLinkAlt,
  FaChartLine,
  FaArrowRight,
  FaFilter,
  FaSearch,
  FaCheckCircle,
  FaGithub,
  FaGlobe,
  FaLaptopCode,
  FaRocket,
  FaUsers,
  FaCode,
  FaLayerGroup,
  FaStar,
  FaQuoteLeft,
  FaClock,
  FaServer,
  FaChevronDown,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const localProjects = [
  {
    id: 1,
    title: "Jagat-Education",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    desc: "Dynamic educational website featuring a responsive Hero section, course listings, and interactive UI components.",
    tech: ["React", "Vite", "Responsive UI", "CSS", "MongoDB"],
    links: { live: "https://jagatverma142.github.io/Jagateducation/", repo: "#" },
  },
  {
    id: 2,
    title: "Jagat-Med Health Portal",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    desc: "Responsive medical website with dynamic routing and service listings deployed on GitHub Pages.",
    tech: ["React", "Vite", "Tailwind", "Gh-Pages", "Responsive Design", "MongoDB"],
    links: { live: "https://jagatverma142.github.io/jagat_med_web/", repo: "#" },
  },
  {
    id: 3,
    title: "Awak_Agency",
    category: "MERN Stack",
    status: "Beta",
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop",
    desc: "Modern digital agency portfolio featuring services from UI/UX to SEO with performance-first UI.",
    tech: ["React", "Vite", "Tailwind", "Gh-Pages", "Responsive Design", "MongoDB"],
    links: { live: "https://jagatverma142.github.io/Digital_Agency/", repo: "#" },
  },
  {
    id: 4,
    title: "Personal Portfolio",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    desc: "High-performance personal portfolio showcasing skills, projects, and contact info.",
    tech: ["React", "Vite", "Framer Motion", "SEO"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 5,
    title: "Artist Portfolio",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    desc: "Visually-driven site featuring custom galleries and SEO-optimized content for artists.",
    tech: ["React", "CSS Grid", "Lazy Load"],
    links: { live: "#", repo: "#" },
  },

  {
    id: 6,
    title: "College Management System",
    category: "Django",
    status: "Live",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    desc: "Comprehensive platform to manage student/faculty records and department schedules.",
    tech: ["Django", "MySQL", "Python", "HTML/CSS"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 7,
    title: "Hospital Patient Manager",
    category: "Django",
    status: "Live",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    desc: "Secure web app for patient records and appointments with Role-Based Access Control.",
    tech: ["Django", "RBAC", "Bootstrap", "SQLite"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 8,
    title: "Insurance Claim Portal",
    category: "Django",
    status: "Done",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    desc: "Secure portal for users to submit claims and agents to track statuses with high data integrity.",
    tech: ["Django", "Python", "Secure Auth"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 9,
    title: "Food Ordering Site",
    category: "Django",
    status: "Beta",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    desc: "Dynamic e-commerce site featuring a real-time shopping cart and menu management APIs.",
    tech: ["Django", "REST API", "JavaScript", "AJAX"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 10,
    title: "Inventory Management",
    category: "Django",
    status: "Done",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    desc: "Automated system to track stock levels, generate reports, and manage supplier data.",
    tech: ["Django", "MySQL", "Chart.js"],
    links: { live: "#", repo: "#" },
  },

  {
    id: 11,
    title: "Headless E-Commerce",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
    desc: "Decoupled architecture style build (CMS + fast frontend).",
    tech: ["Next.js", "WPGraphQL", "WooCommerce", "Tailwind"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 12,
    title: "Custom Real Estate Portal",
    category: "Client Work",
    status: "Done",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    desc: "Advanced property listing site with custom post types, filtering and map integration.",
    tech: ["Custom Theme", "ACF Pro", "Google Maps API", "PHP"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 13,
    title: "Live Hospital website",
    category: "Client Work",
    status: "Plugin",
    img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=1200&auto=format&fit=crop",
    desc: "Sarthak Hospital, Agra – trusted multi-speciality care with advanced facilities, expert doctors, and 24x7 emergency support.",
    tech: ["PHP", "Plugin Dev", "AJAX", "MySQL"],
    links: { live: "https://tajtriptour.in/index.php?lang=en", repo: "#" },
  },
  {
    id: 14,
    title: "Point To Taxi",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop",
    desc: "Live taxi/business website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://pointtotaxi.in/", repo: "#" },
  },
  {
    id: 15,
    title: "The Dentist Studio",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop",
    desc: "Live dental clinic website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://thedentiststudio.com/", repo: "#" },
  },
  {
    id: 16,
    title: "AUGC",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    desc: "Live organization website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://augc.in/", repo: "#" },
  },
  {
    id: 17,
    title: "AMDC Agra",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop",
    desc: "Live organization website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://amdcagra.in/", repo: "#" },
  },
  {
    id: 18,
    title: "Delhi Agra Jaipur Tour",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    desc: "Live tourism website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://delhiagrajaipurtour.in/", repo: "#" },
  },
  {
    id: 20,
    title: "Aravstar",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    desc: "Live business website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://aravstar.com/index.php", repo: "#" },
  },
  {
    id: 21,
    title: "Taj Trip Tour (JD)",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1505839673365-e3971f8d9184?q=80&w=1200&auto=format&fit=crop",
    desc: "Live tourism website (JD section).",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://tajtriptour.in/JD/index.php", repo: "#" },
  },
  {
    id: 22,
    title: "Yadu Hospital (Services)",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
    desc: "Live hospital services page.",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://yaduhospital.com/service.html", repo: "#" },
  },
  {
    id: 23,
    title: "Crown Plus",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    desc: "Live business website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://crownplus.in/", repo: "#" },
  },
  {
    id: 24,
    title: "Chandra Metal",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1581091215367-59ab6b56f1b4?q=80&w=1200&auto=format&fit=crop",
    desc: "Live company website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://www.chandrametal.com/", repo: "#" },
  },
];

const Projects = () => {
  const [dbProjects, setDbProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedTech, setSelectedTech] = useState('All');
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setDbProjects(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory, activeStatus, searchTerm, sortBy, selectedTech, showLiveOnly]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const hasValidLink = (url) => url && url !== '#';

  const getStatusClasses = (status = '') => {
    const value = status.toLowerCase();
    if (value === 'live') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (value === 'beta') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (value === 'done') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (value === 'plugin') return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const normalizeDbProjects = useMemo(() => {
    return dbProjects.map((project, index) => ({
      id: project._id || `db-${index}`,
      title: project.title || 'Untitled Project',
      category: project.category || 'Custom Project',
      status: project.status || 'Live',
      img:
        project.imageUrl ||
        project.img ||
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      desc: project.description || project.desc || 'Project details will be available soon.',
      tech: Array.isArray(project.tech)
        ? project.tech
        : Array.isArray(project.technologies)
        ? project.technologies
        : [],
      links: {
        live: project.liveLink || project?.links?.live || '#',
        repo: project.repoLink || project?.links?.repo || '#',
      },
      source: 'database',
      createdOrder: 1000 + index,
    }));
  }, [dbProjects]);

  const allProjects = useMemo(() => {
    const local = localProjects.map((item, index) => ({
      ...item,
      source: 'local',
      createdOrder: item.id || index,
    }));
    return [...local, ...normalizeDbProjects];
  }, [normalizeDbProjects]);

  const categories = useMemo(() => {
    return ['All', ...new Set(allProjects.map((project) => project.category))];
  }, [allProjects]);

  const statuses = useMemo(() => {
    return ['All', ...new Set(allProjects.map((project) => project.status))];
  }, [allProjects]);

  const techOptions = useMemo(() => {
    const techs = allProjects.flatMap((project) => project.tech || []);
    return ['All', ...new Set(techs)].slice(0, 20);
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    let data = [...allProjects];

    data = data.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;
      const matchesStatus =
        activeStatus === 'All' || project.status === activeStatus;
      const matchesTech =
        selectedTech === 'All' || project.tech.includes(selectedTech);
      const matchesLive = !showLiveOnly || project.status === 'Live';
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(search) ||
        project.desc.toLowerCase().includes(search) ||
        project.category.toLowerCase().includes(search) ||
        project.tech.join(' ').toLowerCase().includes(search);

      return (
        matchesCategory &&
        matchesStatus &&
        matchesTech &&
        matchesLive &&
        matchesSearch
      );
    });

    if (sortBy === 'latest') {
      data.sort((a, b) => (b.createdOrder || 0) - (a.createdOrder || 0));
    } else if (sortBy === 'name-asc') {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-desc') {
      data.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'live-first') {
      data.sort((a, b) => {
        if (a.status === 'Live' && b.status !== 'Live') return -1;
        if (a.status !== 'Live' && b.status === 'Live') return 1;
        return a.title.localeCompare(b.title);
      });
    } else if (sortBy === 'category') {
      data.sort((a, b) => a.category.localeCompare(b.category));
    }

    return data;
  }, [allProjects, activeCategory, activeStatus, searchTerm, selectedTech, showLiveOnly, sortBy]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const spotlightProject = useMemo(() => {
    return filteredProjects.find((project) => hasValidLink(project.links?.live)) || filteredProjects[0];
  }, [filteredProjects]);

  const featuredProjects = useMemo(() => {
    return allProjects
      .filter((project) => project.status === 'Live' && hasValidLink(project.links?.live))
      .slice(0, 3);
  }, [allProjects]);

  const stats = useMemo(() => {
    const liveCount = allProjects.filter((project) => project.status === 'Live').length;
    const categoryCount = new Set(allProjects.map((project) => project.category)).size;
    const clientWorkCount = allProjects.filter(
      (project) => project.category === 'Client Work'
    ).length;
    const techCount = new Set(allProjects.flatMap((project) => project.tech || [])).size;

    return [
      { number: allProjects.length, label: 'Total Projects' },
      { number: liveCount, label: 'Live Projects' },
      { number: categoryCount, label: 'Categories' },
      { number: techCount, label: 'Tech Stacks' },
      { number: clientWorkCount, label: 'Client Works' },
    ];
  }, [allProjects]);

  const categoryHighlights = useMemo(() => {
    const map = {};
    allProjects.forEach((project) => {
      map[project.category] = (map[project.category] || 0) + 1;
    });

    return Object.entries(map).map(([name, count]) => ({
      name,
      count,
    }));
  }, [allProjects]);

  const topTechStacks = useMemo(() => {
    const map = {};
    allProjects.forEach((project) => {
      (project.tech || []).forEach((tech) => {
        map[tech] = (map[tech] || 0) + 1;
      });
    });

    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [allProjects]);

  const processSteps = [
    {
      step: '01',
      title: 'Planning',
      desc: 'We understand the business goal, user journey and technical scope before building.',
      icon: <FaRocket />,
    },
    {
      step: '02',
      title: 'Design & Build',
      desc: 'We create responsive interfaces, project structure and scalable frontend or backend flows.',
      icon: <FaLaptopCode />,
    },
    {
      step: '03',
      title: 'Testing',
      desc: 'We check responsiveness, navigation, performance and real-world usability before launch.',
      icon: <FaCheckCircle />,
    },
    {
      step: '04',
      title: 'Launch & Improve',
      desc: 'We deploy, monitor and continue improving based on feedback and project goals.',
      icon: <FaChartLine />,
    },
  ];

  const testimonials = [
    {
      name: 'Client Feedback',
      role: 'Business Website Project',
      quote:
        'The site was delivered with a clean layout, strong responsiveness and much better user experience than our old version.',
    },
    {
      name: 'Startup Founder',
      role: 'Web App Build',
      quote:
        'Communication was smooth, the interface felt modern and the project structure was clear from day one.',
    },
    {
      name: 'Local Brand Owner',
      role: 'Marketing + Website',
      quote:
        'Our project was not just made attractive, it was made practical for real users and business growth.',
    },
  ];

  const faqs = [
    {
      q: 'Can this page show both local and admin projects together?',
      a: 'Yes, this code merges your hardcoded portfolio projects with database projects from the API.',
    },
    {
      q: 'Can I filter by category, status and technology?',
      a: 'Yes, this page includes category filters, status filters, tech filters, search and sorting.',
    },
    {
      q: 'Is this page responsive?',
      a: 'Yes, layouts are built with responsive grid, flexible sections and mobile-friendly controls.',
    },
    {
      q: 'Can I add more projects later?',
      a: 'Yes, you can keep adding projects to the local array or from your admin panel API.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-hidden pb-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 text-white py-24 md:py-32 px-6 overflow-hidden border-b-4 border-blue-600">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <span className="inline-flex px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-200 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-6">
            Advanced Portfolio Showcase
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Live Projects, Client Work & Real Case Studies
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Explore MERN stack builds, Django applications and real client websites with advanced filters, search, sorting and live project access.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
            >
              Start Your Project <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/services"
              className="border border-gray-500 hover:border-white text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300"
            >
              View Services
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
            >
              <h3 className="text-3xl md:text-5xl font-extrabold mb-2">{stat.number}+</h3>
              <p className="text-blue-100 uppercase tracking-wider text-xs md:text-sm font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured live projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
                  Featured Live Projects
                </h2>
                <p className="text-gray-600 mt-3 max-w-2xl text-lg">
                  Directly accessible live websites from your portfolio.
                </p>
              </div>

              <div className="inline-flex items-center text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                <FaGlobe className="mr-2" /> Live Showcase
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
                >
                  <div className="h-64 overflow-hidden bg-gray-100">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>

                  <div className="p-7">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {project.category}
                      </span>
                      <span
                        className={`border text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${getStatusClasses(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{project.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl transition"
                    >
                      Visit Live Site <FaExternalLinkAlt className="ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spotlight */}
      {spotlightProject && (
        <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <img
                src={spotlightProject.img}
                alt={spotlightProject.title}
                className="w-full h-[320px] md:h-[460px] object-cover"
              />
              <div className="absolute top-5 left-5 bg-gray-900/90 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                Project Spotlight
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {spotlightProject.category}
                </span>
                <span className={`border px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusClasses(spotlightProject.status)}`}>
                  {spotlightProject.status}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5">
                {spotlightProject.title}
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {spotlightProject.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <FaLayerGroup />, label: 'Stack', value: spotlightProject.tech.slice(0, 3).join(', ') || 'Custom Stack' },
                  { icon: <FaClock />, label: 'Status', value: spotlightProject.status },
                  { icon: <FaServer />, label: 'Type', value: spotlightProject.category },
                  { icon: <FaStar />, label: 'Source', value: spotlightProject.source === 'database' ? 'Admin Managed' : 'Portfolio Listed' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <div className="text-blue-600 mb-2">{item.icon}</div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {hasValidLink(spotlightProject.links?.live) && (
                  <a
                    href={spotlightProject.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full transition"
                  >
                    View Live Project <FaExternalLinkAlt className="ml-2" />
                  </a>
                )}

                {hasValidLink(spotlightProject.links?.repo) && (
                  <a
                    href={spotlightProject.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center border border-gray-300 hover:border-gray-500 text-gray-900 font-bold py-4 px-8 rounded-full transition"
                  >
                    View Repo <FaGithub className="ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="px-6 py-8 bg-white sticky top-0 z-20 backdrop-blur-sm border-y border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex items-center justify-center text-sm font-semibold text-gray-500">
            <FaFilter className="mr-2" /> Advanced Portfolio Filters
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative lg:col-span-2">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, tech, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-3 px-4 pr-10 focus:outline-none focus:border-blue-500 transition"
              >
                <option value="latest">Sort: Latest</option>
                <option value="live-first">Sort: Live First</option>
                <option value="name-asc">Sort: A-Z</option>
                <option value="name-desc">Sort: Z-A</option>
                <option value="category">Sort: Category</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <label className="flex items-center justify-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showLiveOnly}
                onChange={(e) => setShowLiveOnly(e.target.checked)}
                className="accent-blue-600"
              />
              Show Live Only
            </label>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-blue-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  activeStatus === status
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {techOptions.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition ${
                  selectedTech === tech
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category summary */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {categoryHighlights.map((item, index) => (
              <motion.div
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                    <FaCode />
                  </div>
                  <span className="text-2xl font-extrabold text-gray-900">{item.count}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Projects in this category</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack insights */}
      <section className="py-20 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Stack & Technology Highlights
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
              A quick view of the technologies most visible across your portfolio.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
            {topTechStacks.map((item, index) => (
              <motion.div
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-2xl border border-gray-100 p-5 text-center hover:shadow-lg transition"
              >
                <div className="text-2xl text-blue-600 flex justify-center mb-3">
                  <FaLayerGroup />
                </div>
                <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.count} projects</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All projects */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              All Projects
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Showing {visibleProjects.length} of {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-75"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 flex flex-col group"
                >
                  <div className="h-72 bg-gray-200 overflow-hidden relative">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute top-5 left-5 bg-gray-900/90 text-white text-xs font-bold px-4 py-2 rounded-md uppercase tracking-wider shadow-lg">
                      {project.category}
                    </div>

                    <div
                      className={`absolute top-5 right-5 border text-xs font-bold px-4 py-2 rounded-md uppercase tracking-wider shadow-lg ${getStatusClasses(project.status)}`}
                    >
                      {project.status}
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 mb-4 text-xs flex-wrap">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                        {project.source === 'database' ? 'Admin Project' : 'Portfolio Project'}
                      </span>
                      {hasValidLink(project.links?.live) && (
                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                          Live URL
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{project.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                      {hasValidLink(project.links?.live) ? (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl transition"
                        >
                          Live Demo <FaExternalLinkAlt className="ml-2" />
                        </a>
                      ) : (
                        <div className="flex items-center justify-center bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold py-3.5 px-4 rounded-xl">
                          <FaCheckCircle className="mr-2" /> Delivered
                        </div>
                      )}

                      {hasValidLink(project.links?.repo) ? (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 font-bold py-3.5 px-4 rounded-xl transition"
                        >
                          Repo <FaGithub className="ml-2" />
                        </a>
                      ) : (
                        <div className="flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 font-semibold py-3.5 px-4 rounded-xl">
                          Repository Private
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {visibleCount < filteredProjects.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full transition"
                >
                  Load More Projects <FaArrowRight className="ml-2" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Process */}
      <section className="py-20 md:py-24 px-6 bg-gray-950 text-white mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold">How These Projects Are Built</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              A workflow focused on planning, responsiveness, launch quality and long-term usability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-blue-400/40 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-blue-300 flex items-center justify-center text-2xl mb-5">
                  {item.icon}
                </div>
                <div className="text-sm font-bold tracking-[0.2em] text-blue-300 mb-3">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Feature blocks */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaUsers />,
              title: 'Client Work Included',
              desc: 'Portfolio now showcases personal projects, educational builds and real client websites together.',
            },
            {
              icon: <FaLaptopCode />,
              title: 'Multi-Stack Portfolio',
              desc: 'MERN, Django and custom client work are organized into one structured responsive portfolio.',
            },
            {
              icon: <FaGlobe />,
              title: 'Live Link Ready',
              desc: 'Projects with valid live URLs automatically show direct action buttons for quick access.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.08 }}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="text-3xl text-blue-600 mb-5">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              What Clients Say
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
              A strong portfolio feels even better when paired with proof and trust signals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name + index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.08 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
              >
                <FaQuoteLeft className="text-3xl text-blue-200 mb-5" />
                <p className="text-gray-700 leading-relaxed mb-6">{item.quote}</p>
                <div className="pt-5 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-blue-600 font-medium">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Common questions about this advanced portfolio page.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm"
              >
                <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-bold text-gray-900">
                  <span>{faq.q}</span>
                  <span className="text-blue-600 text-xl">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto text-center mt-16 px-6">
        <div className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 text-white rounded-[2rem] p-10 md:p-16 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Want your project featured here next?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Let’s build a fast, modern and responsive website or application that solves a real business problem.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-4 px-10 rounded-full transition shadow-xl"
            >
              Book a Free Strategy Call <FaArrowRight className="ml-3" />
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center justify-center border border-gray-500 hover:border-white text-white font-bold text-lg py-4 px-10 rounded-full transition"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
