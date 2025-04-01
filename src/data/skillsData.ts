import { Award, BrainCircuit, Lightbulb, TrendingUp, Rocket, Code, Database, Shield, Network, Cloud, BookOpen, PenTool, Zap, Users, Globe, BarChart, Calculator, CreditCard, Clock, Heart, MessageSquare, ShoppingCart, FileText, PackageCheck, Target, LineChart, Coffee, DollarSign, Mail, MonitorSmartphone, Palette, Power, Radio, Smartphone, Monitor, GitBranch, Lock, SearchCheck, Settings, Share2, Truck, Video, Wifi, Headphones, Wrench } from 'lucide-react';
import { Skill } from '@/components/skills/types';

// Expanded mock skills data with more entries and categories (250 skills)
export const mockSkills: Skill[] = [
  // Role-based skills (50 skills)
  { id: 1, name: "Leadership", proficiency: "Knowledge", category: "role", icon: "Award", description: "Leadership skills for managing teams and projects", courses: [] },
  { id: 2, name: "Project Management", proficiency: "Skill", category: "role", icon: "BrainCircuit", description: "Managing projects from initiation to completion", courses: [] },
  { id: 3, name: "Data Analysis", proficiency: "Awareness", category: "role", icon: "Lightbulb", description: "Analyzing and interpreting complex data sets", courses: [] },
  { id: 4, name: "Presentation Skills", proficiency: "Knowledge", category: "role", icon: "Award", description: "Effectively presenting information to various audiences", courses: [] },
  { id: 5, name: "Agile Methodologies", proficiency: "Skill", category: "role", icon: "Rocket", description: "Implementing agile practices in software development", courses: [] },
  { id: 6, name: "Strategic Planning", proficiency: "Awareness", category: "role", icon: "BrainCircuit", description: "Developing long-term strategies for business growth", courses: [] },
  { id: 7, name: "Team Building", proficiency: "Knowledge", category: "role", icon: "Users", description: "Building and nurturing effective teams", courses: [] },
  { id: 8, name: "Business Analytics", proficiency: "Awareness", category: "role", icon: "TrendingUp", description: "Using data to drive business decisions", courses: [] },
  { id: 9, name: "Communication", proficiency: "Skill", category: "role", icon: "MessageSquare", description: "Effective verbal and written communication", courses: [] },
  { id: 10, name: "Critical Thinking", proficiency: "Knowledge", category: "role", icon: "BrainCircuit", description: "Analyzing information objectively to make decisions", courses: [] },
  { id: 11, name: "Problem Solving", proficiency: "Skill", category: "role", icon: "Wrench", description: "Identifying and resolving complex problems", courses: [] },
  { id: 12, name: "Negotiation", proficiency: "Awareness", category: "role", icon: "Users", description: "Reaching agreements through discussion", courses: [] },
  { id: 13, name: "Time Management", proficiency: "Knowledge", category: "role", icon: "Clock", description: "Efficiently organizing and prioritizing tasks", courses: [] },
  { id: 14, name: "Delegation", proficiency: "Skill", category: "role", icon: "Award", description: "Assigning tasks and responsibilities effectively", courses: [] },
  { id: 15, name: "Decision Making", proficiency: "Awareness", category: "role", icon: "Target", description: "Making informed choices among alternatives", courses: [] },
  { id: 16, name: "Emotional Intelligence", proficiency: "Knowledge", category: "role", icon: "Heart", description: "Understanding and managing emotions", courses: [] },
  { id: 17, name: "Coaching", proficiency: "Skill", category: "role", icon: "Users", description: "Developing others through guidance", courses: [] },
  { id: 18, name: "Change Management", proficiency: "Awareness", category: "role", icon: "Rocket", description: "Facilitating organizational change", courses: [] },
  { id: 19, name: "Conflict Resolution", proficiency: "Knowledge", category: "role", icon: "Shield", description: "Addressing and resolving disputes", courses: [] },
  { id: 20, name: "Performance Management", proficiency: "Skill", category: "role", icon: "BarChart", description: "Monitoring and improving employee performance", courses: [] },
  
  // Adding 30 more role-based skills
  { id: 21, name: "Public Speaking", proficiency: "Knowledge", category: "role", icon: "Users", description: "Delivering speeches to audiences effectively", courses: [] },
  { id: 22, name: "Risk Management", proficiency: "Skill", category: "role", icon: "Shield", description: "Identifying and mitigating potential risks", courses: [] },
  { id: 23, name: "Stakeholder Management", proficiency: "Awareness", category: "role", icon: "Users", description: "Managing relationships with project stakeholders", courses: [] },
  { id: 24, name: "Budget Planning", proficiency: "Knowledge", category: "role", icon: "DollarSign", description: "Creating and managing financial budgets", courses: [] },
  { id: 25, name: "Cross-functional Collaboration", proficiency: "Skill", category: "role", icon: "Users", description: "Working effectively across different departments", courses: [] },
  { id: 26, name: "Mentoring", proficiency: "Awareness", category: "role", icon: "Users", description: "Guiding less experienced colleagues", courses: [] },
  { id: 27, name: "Process Improvement", proficiency: "Knowledge", category: "role", icon: "Settings", description: "Optimizing workflows and procedures", courses: [] },
  { id: 28, name: "Employee Engagement", proficiency: "Skill", category: "role", icon: "Heart", description: "Creating a positive work environment", courses: [] },
  { id: 29, name: "Resource Allocation", proficiency: "Awareness", category: "role", icon: "Zap", description: "Distributing resources effectively", courses: [] },
  { id: 30, name: "Crisis Management", proficiency: "Knowledge", category: "role", icon: "Shield", description: "Handling emergency situations", courses: [] },
  { id: 31, name: "Team Motivation", proficiency: "Skill", category: "role", icon: "Zap", description: "Inspiring team members to perform well", courses: [] },
  { id: 32, name: "Facilitation", proficiency: "Awareness", category: "role", icon: "Users", description: "Guiding groups through processes", courses: [] },
  { id: 33, name: "Performance Evaluation", proficiency: "Knowledge", category: "role", icon: "BarChart", description: "Assessing employee performance", courses: [] },
  { id: 34, name: "Employee Development", proficiency: "Skill", category: "role", icon: "Users", description: "Growing employee skills and capabilities", courses: [] },
  { id: 35, name: "Strategic Thinking", proficiency: "Awareness", category: "role", icon: "BrainCircuit", description: "Thinking about long-term goals and plans", courses: [] },
  { id: 36, name: "Organizational Skills", proficiency: "Knowledge", category: "role", icon: "FileText", description: "Maintaining order in tasks and projects", courses: [] },
  { id: 37, name: "Team Coordination", proficiency: "Skill", category: "role", icon: "Users", description: "Synchronizing team efforts", courses: [] },
  { id: 38, name: "Adaptability", proficiency: "Awareness", category: "role", icon: "Rocket", description: "Adjusting to changing circumstances", courses: [] },
  { id: 39, name: "Work Prioritization", proficiency: "Knowledge", category: "role", icon: "Clock", description: "Setting task importance and order", courses: [] },
  { id: 40, name: "Remote Team Management", proficiency: "Skill", category: "role", icon: "Wifi", description: "Leading teams in virtual environments", courses: [] },
  { id: 41, name: "Cultural Awareness", proficiency: "Knowledge", category: "role", icon: "Globe", description: "Understanding diverse cultural backgrounds", courses: [] },
  { id: 42, name: "Relationship Building", proficiency: "Skill", category: "role", icon: "Users", description: "Creating strong professional connections", courses: [] },
  { id: 43, name: "Feedback Giving", proficiency: "Awareness", category: "role", icon: "MessageSquare", description: "Providing constructive feedback", courses: [] },
  { id: 44, name: "Meeting Management", proficiency: "Knowledge", category: "role", icon: "Clock", description: "Running effective and efficient meetings", courses: [] },
  { id: 45, name: "Client Relationship Management", proficiency: "Skill", category: "role", icon: "Users", description: "Building and maintaining client relationships", courses: [] },
  { id: 46, name: "Recruitment", proficiency: "Awareness", category: "role", icon: "Users", description: "Finding and hiring suitable candidates", courses: [] },
  { id: 47, name: "Report Writing", proficiency: "Knowledge", category: "role", icon: "FileText", description: "Creating clear and informative reports", courses: [] },
  { id: 48, name: "Innovation Management", proficiency: "Skill", category: "role", icon: "Lightbulb", description: "Fostering and implementing new ideas", courses: [] },
  { id: 49, name: "Cost Control", proficiency: "Awareness", category: "role", icon: "DollarSign", description: "Managing and reducing expenses", courses: [] },
  { id: 50, name: "Quality Assurance", proficiency: "Knowledge", category: "role", icon: "PackageCheck", description: "Ensuring products meet quality standards", courses: [] },
  
  // Recommended skills (50 skills)
  { id: 51, name: "Machine Learning", proficiency: "Awareness", category: "recommended", icon: "BrainCircuit", description: "Fundamentals of machine learning algorithms and applications", courses: [] },
  { id: 52, name: "React Development", proficiency: "Knowledge", category: "recommended", icon: "Rocket", description: "Building web applications with React", courses: [] },
  { id: 53, name: "UX Design", proficiency: "Awareness", category: "recommended", icon: "Lightbulb", description: "Creating user-centered digital experiences", courses: [] },
  { id: 54, name: "Python Programming", proficiency: "Skill", category: "recommended", icon: "Code", description: "Programming with Python for various applications", courses: [] },
  { id: 55, name: "SQL", proficiency: "Knowledge", category: "recommended", icon: "Database", description: "Database querying and management with SQL", courses: [] },
  { id: 56, name: "API Development", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Building and consuming APIs", courses: [] },
  { id: 57, name: "Digital Marketing", proficiency: "Knowledge", category: "recommended", icon: "Globe", description: "Marketing strategies for digital platforms", courses: [] },
  { id: 58, name: "Content Creation", proficiency: "Awareness", category: "recommended", icon: "PenTool", description: "Creating engaging content for various platforms", courses: [] },
  { id: 59, name: "JavaScript", proficiency: "Skill", category: "recommended", icon: "Code", description: "Programming with JavaScript for web development", courses: [] },
  { id: 60, name: "Data Visualization", proficiency: "Knowledge", category: "recommended", icon: "BarChart", description: "Creating visual representations of data", courses: [] },
  
  // Adding 40 more recommended skills
  { id: 61, name: "Product Management", proficiency: "Awareness", category: "recommended", icon: "PackageCheck", description: "Managing product development lifecycle", courses: [] },
  { id: 62, name: "Statistical Analysis", proficiency: "Knowledge", category: "recommended", icon: "BarChart", description: "Using statistics to interpret data", courses: [] },
  { id: 63, name: "Customer Experience", proficiency: "Skill", category: "recommended", icon: "Heart", description: "Optimizing customer interactions", courses: [] },
  { id: 64, name: "Node.js", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Building server-side applications with Node.js", courses: [] },
  { id: 65, name: "Excel Advanced", proficiency: "Knowledge", category: "recommended", icon: "Calculator", description: "Advanced spreadsheet techniques", courses: [] },
  { id: 66, name: "Financial Analysis", proficiency: "Skill", category: "recommended", icon: "DollarSign", description: "Analyzing financial data and reports", courses: [] },
  { id: 67, name: "HTML/CSS", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Building web pages with HTML and CSS", courses: [] },
  { id: 68, name: "Search Engine Optimization", proficiency: "Knowledge", category: "recommended", icon: "SearchCheck", description: "Improving website visibility in search engines", courses: [] },
  { id: 69, name: "Social Media Management", proficiency: "Skill", category: "recommended", icon: "Share2", description: "Managing brand presence on social platforms", courses: [] },
  { id: 70, name: "MongoDB", proficiency: "Awareness", category: "recommended", icon: "Database", description: "Working with NoSQL databases", courses: [] },
  { id: 71, name: "Business Intelligence", proficiency: "Knowledge", category: "recommended", icon: "LineChart", description: "Transforming data into actionable insights", courses: [] },
  { id: 72, name: "Email Marketing", proficiency: "Skill", category: "recommended", icon: "Mail", description: "Creating effective email campaigns", courses: [] },
  { id: 73, name: "TypeScript", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Programming with TypeScript", courses: [] },
  { id: 74, name: "Google Analytics", proficiency: "Knowledge", category: "recommended", icon: "BarChart", description: "Analyzing website traffic and user behavior", courses: [] },
  { id: 75, name: "UI Design", proficiency: "Skill", category: "recommended", icon: "Palette", description: "Designing visual aspects of user interfaces", courses: [] },
  { id: 76, name: "Docker", proficiency: "Awareness", category: "recommended", icon: "PackageCheck", description: "Containerizing applications", courses: [] },
  { id: 77, name: "Market Research", proficiency: "Knowledge", category: "recommended", icon: "Search", description: "Gathering and analyzing market information", courses: [] },
  { id: 78, name: "E-commerce Management", proficiency: "Skill", category: "recommended", icon: "ShoppingCart", description: "Running online stores", courses: [] },
  { id: 79, name: "Git Version Control", proficiency: "Awareness", category: "recommended", icon: "GitBranch", description: "Managing code versions with Git", courses: [] },
  { id: 80, name: "Power BI", proficiency: "Knowledge", category: "recommended", icon: "BarChart", description: "Creating interactive data visualizations", courses: [] },
  { id: 81, name: "Content Strategy", proficiency: "Skill", category: "recommended", icon: "FileText", description: "Planning and managing content creation", courses: [] },
  { id: 82, name: "Angular", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Building web applications with Angular", courses: [] },
  { id: 83, name: "Data Modeling", proficiency: "Knowledge", category: "recommended", icon: "Database", description: "Creating structures for data organization", courses: [] },
  { id: 84, name: "Conversion Rate Optimization", proficiency: "Skill", category: "recommended", icon: "TrendingUp", description: "Improving website conversion rates", courses: [] },
  { id: 85, name: "PHP", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Server-side scripting with PHP", courses: [] },
  { id: 86, name: "Tableau", proficiency: "Knowledge", category: "recommended", icon: "BarChart", description: "Data visualization with Tableau", courses: [] },
  { id: 87, name: "Brand Management", proficiency: "Skill", category: "recommended", icon: "Award", description: "Developing and maintaining brand identity", courses: [] },
  { id: 88, name: "Vue.js", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Building web interfaces with Vue.js", courses: [] },
  { id: 89, name: "Accounting Principles", proficiency: "Knowledge", category: "recommended", icon: "DollarSign", description: "Understanding basic accounting concepts", courses: [] },
  { id: 90, name: "Supply Chain Management", proficiency: "Skill", category: "recommended", icon: "Truck", description: "Optimizing supply chain operations", courses: [] },
  { id: 91, name: "Java Programming", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Programming with Java", courses: [] },
  { id: 92, name: "Salesforce", proficiency: "Knowledge", category: "recommended", icon: "Cloud", description: "Managing customer relationships with Salesforce", courses: [] },
  { id: 93, name: "Video Production", proficiency: "Skill", category: "recommended", icon: "Video", description: "Creating professional videos", courses: [] },
  { id: 94, name: "AWS Services", proficiency: "Awareness", category: "recommended", icon: "Cloud", description: "Using Amazon Web Services", courses: [] },
  { id: 95, name: "User Research", proficiency: "Knowledge", category: "recommended", icon: "Search", description: "Understanding user needs and behaviors", courses: [] },
  { id: 96, name: "Copywriting", proficiency: "Skill", category: "recommended", icon: "PenTool", description: "Writing persuasive marketing copy", courses: [] },
  { id: 97, name: "Ruby on Rails", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Building web applications with Ruby on Rails", courses: [] },
  { id: 98, name: "Competitor Analysis", proficiency: "Knowledge", category: "recommended", icon: "Search", description: "Analyzing competitor strategies and performance", courses: [] },
  { id: 99, name: "CRM Management", proficiency: "Skill", category: "recommended", icon: "Users", description: "Managing customer relationship management systems", courses: [] },
  { id: 100, name: "Mobile App Development", proficiency: "Awareness", category: "recommended", icon: "Smartphone", description: "Creating applications for mobile devices", courses: [] },
  
  // Trending skills (150 skills)
  { id: 101, name: "Cloud Computing", proficiency: "Skill", category: "trending", icon: "Cloud", description: "Working with cloud platforms and services", courses: [] },
  { id: 102, name: "Cybersecurity", proficiency: "Awareness", category: "trending", icon: "Shield", description: "Protecting systems and data from cyber threats", courses: [] },
  { id: 103, name: "DevOps", proficiency: "Knowledge", category: "trending", icon: "Rocket", description: "Integrating development and operations", courses: [] },
  { id: 104, name: "Blockchain", proficiency: "Awareness", category: "trending", icon: "Lock", description: "Understanding blockchain technology and applications", courses: [] },
  { id: 105, name: "Artificial Intelligence", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Applications of AI in business and technology", courses: [] },
  { id: 106, name: "Data Science", proficiency: "Skill", category: "trending", icon: "Database", description: "Extracting insights from data", courses: [] },
  { id: 107, name: "IoT Development", proficiency: "Awareness", category: "trending", icon: "Network", description: "Building Internet of Things solutions", courses: [] },
  { id: 108, name: "Serverless Architecture", proficiency: "Knowledge", category: "trending", icon: "Cloud", description: "Building applications without managing servers", courses: [] },
  { id: 109, name: "Automated Testing", proficiency: "Skill", category: "trending", icon: "Zap", description: "Implementing automated testing for software quality", courses: [] },
  { id: 110, name: "Container Orchestration", proficiency: "Awareness", category: "trending", icon: "Network", description: "Managing containerized applications with tools like Kubernetes", courses: [] },
  { id: 111, name: "Microservices", proficiency: "Knowledge", category: "trending", icon: "Code", description: "Designing and implementing microservice architectures", courses: [] },
  { id: 112, name: "Natural Language Processing", proficiency: "Awareness", category: "trending", icon: "BrainCircuit", description: "Processing and analyzing natural language data", courses: [] },
  { id: 113, name: "Big Data", proficiency: "Skill", category: "trending", icon: "Database", description: "Working with large, complex datasets", courses: [] },
  { id: 114, name: "Cloud Security", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "Securing cloud infrastructure and applications", courses: [] },
  { id: 115, name: "Progressive Web Apps", proficiency: "Awareness", category: "trending", icon: "Globe", description: "Creating web applications that work like native apps", courses: [] },
  { id: 116, name: "Quantum Computing", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Understanding the principles of quantum computing", courses: [] },
  { id: 117, name: "5G Technology", proficiency: "Skill", category: "trending", icon: "Wifi", description: "Working with fifth-generation cellular network technology", courses: [] },
  { id: 118, name: "AR/VR Development", proficiency: "Awareness", category: "trending", icon: "MonitorSmartphone", description: "Creating augmented and virtual reality experiences", courses: [] },
  { id: 119, name: "Edge Computing", proficiency: "Knowledge", category: "trending", icon: "Network", description: "Processing data near the source rather than in a centralized location", courses: [] },
  { id: 120, name: "Robotic Process Automation", proficiency: "Skill", category: "trending", icon: "Zap", description: "Automating repetitive tasks with software robots", courses: [] },
  
  // Adding 130 more trending skills
  { id: 121, name: "Deep Learning", proficiency: "Awareness", category: "trending", icon: "BrainCircuit", description: "Building neural networks for advanced AI applications", courses: [] },
  { id: 122, name: "GraphQL", proficiency: "Knowledge", category: "trending", icon: "Code", description: "Querying APIs with a more efficient alternative to REST", courses: [] },
  { id: 123, name: "Kubernetes", proficiency: "Skill", category: "trending", icon: "Network", description: "Orchestrating containerized applications", courses: [] },
  { id: 124, name: "Low-Code Development", proficiency: "Awareness", category: "trending", icon: "Code", description: "Building applications with minimal coding", courses: [] },
  { id: 125, name: "TensorFlow", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Using Google's machine learning framework", courses: [] },
  { id: 126, name: "Web3", proficiency: "Skill", category: "trending", icon: "Globe", description: "Building applications for the decentralized web", courses: [] },
  { id: 127, name: "MLOps", proficiency: "Awareness", category: "trending", icon: "BrainCircuit", description: "Operationalizing machine learning models", courses: [] },
  { id: 128, name: "Smart Contract Development", proficiency: "Knowledge", category: "trending", icon: "FileText", description: "Creating self-executing contracts on blockchain", courses: [] },
  { id: 129, name: "Voice UI Design", proficiency: "Skill", category: "trending", icon: "Headphones", description: "Designing interfaces for voice-activated devices", courses: [] },
  { id: 130, name: "DataOps", proficiency: "Awareness", category: "trending", icon: "Database", description: "Improving data analytics efficiency", courses: [] },
  { id: 131, name: "Rust Programming", proficiency: "Knowledge", category: "trending", icon: "Code", description: "Programming with the Rust language", courses: [] },
  { id: 132, name: "Zero Trust Security", proficiency: "Skill", category: "trending", icon: "Shield", description: "Implementing security models that trust nothing by default", courses: [] },
  { id: 133, name: "Emotional AI", proficiency: "Awareness", category: "trending", icon: "Heart", description: "AI systems that recognize human emotions", courses: [] },
  { id: 134, name: "Go Programming", proficiency: "Knowledge", category: "trending", icon: "Code", description: "Programming with Google's Go language", courses: [] },
  { id: 135, name: "Digital Twin Technology", proficiency: "Skill", category: "trending", icon: "Copy", description: "Creating virtual replicas of physical systems", courses: [] },
  { id: 136, name: "GitOps", proficiency: "Awareness", category: "trending", icon: "GitBranch", description: "Using Git repositories for infrastructure management", courses: [] },
  { id: 137, name: "Computer Vision", proficiency: "Knowledge", category: "trending", icon: "Monitor", description: "Enabling machines to interpret visual data", courses: [] },
  { id: 138, name: "Kubernetes Security", proficiency: "Skill", category: "trending", icon: "Shield", description: "Securing Kubernetes deployments", courses: [] },
  { id: 139, name: "React Native", proficiency: "Awareness", category: "trending", icon: "Smartphone", description: "Building mobile apps with React", courses: [] },
  { id: 140, name: "Responsible AI", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "Developing ethical AI systems", courses: [] },
  { id: 141, name: "FinOps", proficiency: "Skill", category: "trending", icon: "DollarSign", description: "Managing cloud costs effectively", courses: [] },
  { id: 142, name: "Kotlin", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Kotlin language", courses: [] },
  { id: 143, name: "AIOps", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Using AI for IT operations", courses: [] },
  { id: 144, name: "Design Thinking", proficiency: "Skill", category: "trending", icon: "Lightbulb", description: "Using design methodologies to solve problems", courses: [] },
  { id: 145, name: "Swift Programming", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming for Apple platforms", courses: [] },
  { id: 146, name: "Site Reliability Engineering", proficiency: "Knowledge", category: "trending", icon: "Settings", description: "Merging software engineering and operations", courses: [] },
  { id: 147, name: "Flutter", proficiency: "Skill", category: "trending", icon: "Smartphone", description: "Building native apps with Google's UI toolkit", courses: [] },
  { id: 148, name: "Biometric Authentication", proficiency: "Awareness", category: "trending", icon: "Lock", description: "Using biological characteristics for authentication", courses: [] },
  { id: 149, name: "Neural Networks", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Building computational models inspired by the brain", courses: [] },
  { id: 150, name: "Sustainable IT", proficiency: "Skill", category: "trending", icon: "Power", description: "Implementing environmentally friendly IT practices", courses: [] },
  { id: 151, name: "Dart Programming", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with Google's Dart language", courses: [] },
  { id: 152, name: "Ethics in Technology", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "Applying ethical principles to technology development", courses: [] },
  { id: 153, name: "RPA Development", proficiency: "Skill", category: "trending", icon: "Zap", description: "Building robotic process automation solutions", courses: [] },
  { id: 154, name: "Svelte", proficiency: "Awareness", category: "trending", icon: "Code", description: "Building web applications with Svelte", courses: [] },
  { id: 155, name: "Federated Learning", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Training AI models across decentralized devices", courses: [] },
  { id: 156, name: "Prescriptive Analytics", proficiency: "Skill", category: "trending", icon: "BarChart", description: "Using analytics to determine optimal actions", courses: [] },
  { id: 157, name: "Scala", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Scala language", courses: [] },
  { id: 158, name: "Explainable AI", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Creating AI systems that explain their decisions", courses: [] },
  { id: 159, name: "Continuous Integration", proficiency: "Skill", category: "trending", icon: "GitBranch", description: "Automating code integration into shared repositories", courses: [] },
  { id: 160, name: "Elixir", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Elixir language", courses: [] },
  { id: 161, name: "Predictive Maintenance", proficiency: "Knowledge", category: "trending", icon: "Wrench", description: "Using data to predict equipment failures", courses: [] },
  { id: 162, name: "API Security", proficiency: "Skill", category: "trending", icon: "Shield", description: "Securing application programming interfaces", courses: [] },
  { id: 163, name: "Julia Programming", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Julia language", courses: [] },
  { id: 164, name: "Sentiment Analysis", proficiency: "Knowledge", category: "trending", icon: "Heart", description: "Analyzing emotions in text data", courses: [] },
  { id: 165, name: "Infrastructure as Code", proficiency: "Skill", category: "trending", icon: "Code", description: "Managing infrastructure through code", courses: [] },
  { id: 166, name: "Haskell", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Haskell language", courses: [] },
  { id: 167, name: "Speech Recognition", proficiency: "Knowledge", category: "trending", icon: "Radio", description: "Converting spoken language into text", courses: [] },
  { id: 168, name: "Serverless Security", proficiency: "Skill", category: "trending", icon: "Shield", description: "Securing serverless applications", courses: [] },
  { id: 169, name: "Elm", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming web applications with Elm", courses: [] },
  { id: 170, name: "Time Series Analysis", proficiency: "Knowledge", category: "trending", icon: "Clock", description: "Analyzing data points collected over time", courses: [] },
  { id: 171, name: "JAMstack", proficiency: "Skill", category: "trending", icon: "Code", description: "Building websites with JavaScript, APIs, and Markup", courses: [] },
  { id: 172, name: "R Programming", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming for statistical computing", courses: [] },
  { id: 173, name: "Anomaly Detection", proficiency: "Knowledge", category: "trending", icon: "SearchCheck", description: "Identifying unusual patterns in data", courses: [] },
  { id: 174, name: "API Gateway", proficiency: "Skill", category: "trending", icon: "Network", description: "Managing API traffic and security", courses: [] },
  { id: 175, name: "Clojure", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Clojure language", courses: [] },
  { id: 176, name: "Model Optimization", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Improving machine learning model performance", courses: [] },
  { id: 177, name: "CI/CD Pipelines", proficiency: "Skill", category: "trending", icon: "GitBranch", description: "Automating software delivery processes", courses: [] },
  { id: 178, name: "F#", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the F# language", courses: [] },
  { id: 179, name: "Customer Data Platforms", proficiency: "Knowledge", category: "trending", icon: "Database", description: "Unifying customer data from various sources", courses: [] },
  { id: 180, name: "Chaos Engineering", proficiency: "Skill", category: "trending", icon: "Zap", description: "Testing system resilience through controlled disruption", courses: [] },
  { id: 181, name: "Crystal Programming", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Crystal language", courses: [] },
  { id: 182, name: "Data Governance", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "Managing the availability and security of data", courses: [] },
  { id: 183, name: "BDD Testing", proficiency: "Skill", category: "trending", icon: "PackageCheck", description: "Testing based on behavior specifications", courses: [] },
  { id: 184, name: "COBOL", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the COBOL language", courses: [] },
  { id: 185, name: "Digital Ethics", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "Applying ethical principles in digital contexts", courses: [] },
  { id: 186, name: "Terraform", proficiency: "Skill", category: "trending", icon: "Code", description: "Managing infrastructure as code with Terraform", courses: [] },
  { id: 187, name: "WebAssembly", proficiency: "Awareness", category: "trending", icon: "Code", description: "Running code at near-native speed in browsers", courses: [] },
  { id: 188, name: "Knowledge Graphs", proficiency: "Knowledge", category: "trending", icon: "Network", description: "Creating semantic networks of information", courses: [] },
  { id: 189, name: "Service Mesh", proficiency: "Skill", category: "trending", icon: "Network", description: "Managing service-to-service communication", courses: [] },
  { id: 190, name: "Erlang", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Erlang language", courses: [] },
  { id: 191, name: "Recommender Systems", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Building systems that suggest items to users", courses: [] },
  { id: 192, name: "Immutable Infrastructure", proficiency: "Skill", category: "trending", icon: "Lock", description: "Managing infrastructure that never changes", courses: [] },
  { id: 193, name: "Perl", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Perl language", courses: [] },
  { id: 194, name: "IoT Security", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "Securing Internet of Things devices", courses: [] },
  { id: 195, name: "Feature Engineering", proficiency: "Skill", category: "trending", icon: "BrainCircuit", description: "Creating features for machine learning models", courses: [] },
  { id: 196, name: "Groovy", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Groovy language", courses: [] },
  { id: 197, name: "Zero-Knowledge Proofs", proficiency: "Knowledge", category: "trending", icon: "Lock", description: "Verifying information without revealing it", courses: [] },
  { id: 198, name: "Event-Driven Architecture", proficiency: "Skill", category: "trending", icon: "Zap", description: "Building systems that respond to events", courses: [] },
  { id: 199, name: "Fortran", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Fortran language", courses: [] },
  { id: 200, name: "Prompt Engineering", proficiency: "Knowledge", category: "trending", icon: "MessageSquare", description: "Crafting effective prompts for AI systems", courses: [] },
  { id: 201, name: "Edge AI", proficiency: "Skill", category: "trending", icon: "BrainCircuit", description: "Running AI applications on edge devices", courses: [] },
  { id: 202, name: "ABAP", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming for SAP applications", courses: [] },
  { id: 203, name: "Data Mesh", proficiency: "Knowledge", category: "trending", icon: "Network", description: "Creating distributed data architecture", courses: [] },
  { id: 204, name: "Blue/Green Deployment", proficiency: "Skill", category: "trending", icon: "GitBranch", description: "Reducing deployment downtime and risk", courses: [] },
  { id: 205, name: "Objective-C", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming for Apple platforms", courses: [] },
  { id: 206, name: "Federated Analytics", proficiency: "Knowledge", category: "trending", icon: "Database", description: "Analyzing data without central collection", courses: [] },
  { id: 207, name: "Load Testing", proficiency: "Skill", category: "trending", icon: "PackageCheck", description: "Testing how systems perform under load", courses: [] },
  { id: 208, name: "D Programming", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the D language", courses: [] },
  { id: 209, name: "Cognitive Computing", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Building systems that mimic human thought", courses: [] },
  { id: 210, name: "Continuous Deployment", proficiency: "Skill", category: "trending", icon: "GitBranch", description: "Automatically deploying code changes", courses: [] },
  { id: 211, name: "Ada", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Ada language", courses: [] },
  { id: 212, name: "Conversational AI", proficiency: "Knowledge", category: "trending", icon: "MessageSquare", description: "Building AI systems that converse naturally", courses: [] },
  { id: 213, name: "Infrastructure Monitoring", proficiency: "Skill", category: "trending", icon: "Monitor", description: "Monitoring the health of IT infrastructure", courses: [] },
  { id: 214, name: "LISP", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the LISP language", courses: [] },
  { id: 215, name: "Generative AI", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Building AI that creates new content", courses: [] },
  { id: 216, name: "Canary Deployment", proficiency: "Skill", category: "trending", icon: "GitBranch", description: "Gradually releasing features to users", courses: [] },
  { id: 217, name: "MATLAB", proficiency: "Awareness", category: "trending", icon: "Calculator", description: "Programming for numerical computing", courses: [] },
  { id: 218, name: "Reinforcement Learning", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Training AI through reward systems", courses: [] },
  { id: 219, name: "Penetration Testing", proficiency: "Skill", category: "trending", icon: "Shield", description: "Testing system security by simulating attacks", courses: [] },
  { id: 220, name: "VHDL", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming hardware description", courses: [] },
  { id: 221, name: "Edge Analytics", proficiency: "Knowledge", category: "trending", icon: "BarChart", description: "Analyzing data at the edge of networks", courses: [] },
  { id: 222, name: "A/B Testing", proficiency: "Skill", category: "trending", icon: "PackageCheck", description: "Testing variations to determine which performs better", courses: [] },
  { id: 223, name: "VBA", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming for Microsoft Office applications", courses: [] },
  { id: 224, name: "Synthetic Data", proficiency: "Knowledge", category: "trending", icon: "Database", description: "Creating artificial data for testing and training", courses: [] },
  { id: 225, name: "Log Analysis", proficiency: "Skill", category: "trending", icon: "FileText", description: "Analyzing system logs for insights", courses: [] },
  { id: 226, name: "Assembly Language", proficiency: "Awareness", category: "trending", icon: "Code", description: "Low-level programming language", courses: [] },
  { id: 227, name: "Multimodal AI", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "AI that processes multiple types of information", courses: [] },
  { id: 228, name: "Compliance as Code", proficiency: "Skill", category: "trending", icon: "Shield", description: "Automating compliance verification", courses: [] },
  { id: 229, name: "PL/SQL", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming for Oracle databases", courses: [] },
  { id: 230, name: "Quantum Machine Learning", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Applying quantum computing to machine learning", courses: [] },
  { id: 231, name: "Automated Code Review", proficiency: "Skill", category: "trending", icon: "Code", description: "Using tools to review code automatically", courses: [] },
  { id: 232, name: "Pascal", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Pascal language", courses: [] },
  { id: 233, name: "Transfer Learning", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Applying knowledge from one task to another", courses: [] },
  { id: 234, name: "GitLab CI", proficiency: "Skill", category: "trending", icon: "GitBranch", description: "Automating with GitLab's CI/CD", courses: [] },
  { id: 235, name: "Bash Scripting", proficiency: "Awareness", category: "trending", icon: "Code", description: "Automating tasks with Bash scripts", courses: [] },
  { id: 236, name: "Data Fabric", proficiency: "Knowledge", category: "trending", icon: "Network", description: "Creating integrated data architecture", courses: [] },
  { id: 237, name: "Vulnerability Scanning", proficiency: "Skill", category: "trending", icon: "Shield", description: "Identifying security vulnerabilities", courses: [] },
  { id: 238, name: "Prolog", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Prolog language", courses: [] },
  { id: 239, name: "Data Observability", proficiency: "Knowledge", category: "trending", icon: "Monitor", description: "Monitoring data quality and health", courses: [] },
  { id: 240, name: "GitOps Workflow", proficiency: "Skill", category: "trending", icon: "GitBranch", description: "Managing infrastructure through Git", courses: [] },
  { id: 241, name: "Verilog", proficiency: "Awareness", category: "trending", icon: "Code", description: "Hardware description language", courses: [] },
  { id: 242, name: "Privacy-Preserving AI", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "AI that respects user privacy", courses: [] },
  { id: 243, name: "Performance Testing", proficiency: "Skill", category: "trending", icon: "PackageCheck", description: "Testing system performance", courses: [] },
  { id: 244, name: "Scheme", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming with the Scheme language", courses: [] },
  { id: 245, name: "AI Safety", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "Ensuring AI systems operate safely", courses: [] },
  { id: 246, name: "Continuous Monitoring", proficiency: "Skill", category: "trending", icon: "Monitor", description: "Ongoing monitoring of systems", courses: [] },
  { id: 247, name: "Apex", proficiency: "Awareness", category: "trending", icon: "Code", description: "Programming for Salesforce", courses: [] },
  { id: 248, name: "Homomorphic Encryption", proficiency: "Knowledge", category: "trending", icon: "Lock", description: "Performing computations on encrypted data", courses: [] },
  { id: 249, name: "Security Posture Management", proficiency: "Skill", category: "trending", icon: "Shield", description: "Managing overall security status", courses: [] },
  { id: 250, name: "COBOL Modernization", proficiency: "Awareness", category: "trending", icon: "Code", description: "Updating legacy COBOL systems", courses: [] }
];

// Helper function to get icon component by name
export const getIconByName = (iconName: string) => {
  switch(iconName) {
    case 'Award': return Award;
    case 'BrainCircuit': return BrainCircuit;
    case 'Lightbulb': return Lightbulb;
    case 'Rocket': return Rocket;
    case 'TrendingUp': return TrendingUp;
    case 'Code': return Code;
    case 'Database': return Database;
    case 'Shield': return Shield;
    case 'Network': return Network;
    case 'Cloud': return Cloud;
    case 'BookOpen': return BookOpen;
    case 'PenTool': return PenTool;
    case 'Zap': return Zap;
    case 'Users': return Users;
    case 'Globe': return Globe;
    case 'BarChart': return BarChart;
    case 'Calculator': return Calculator;
    case 'CreditCard': return CreditCard;
    case 'Clock': return Clock;
    case 'Heart': return Heart;
    case 'MessageSquare': return MessageSquare;
    case 'ShoppingCart': return ShoppingCart;
    case 'FileText': return FileText;
    case 'PackageCheck': return PackageCheck;
    case 'Target': return Target;
    case 'LineChart': return LineChart;
    case 'Coffee': return Coffee;
    case 'DollarSign': return DollarSign;
    case 'Mail': return Mail;
    case 'MonitorSmartphone': return MonitorSmartphone;
    case 'Palette': return Palette;
    case 'Power': return Power;
    case 'Radio': return Radio;
    case 'Smartphone': return Smartphone;
    case 'Monitor': return Monitor;
    case 'GitBranch': return GitBranch;
    case 'Lock': return Lock;
    case 'SearchCheck': return SearchCheck;
    case 'Settings': return Settings;
    case 'Share2': return Share2;
    case 'Truck': return Truck;
    case 'Video': return Video;
    case 'Wifi': return Wifi;
    case 'Headphones': return Headphones;
    case 'Wrench': return Wrench;
    default: return BrainCircuit;
  }
};

// Proficiency color mapping
export const proficiencyColors = {
  "Awareness": "bg-blue-100 text-blue-800",
  "Knowledge": "bg-purple-100 text-purple-800",
  "Skill": "bg-green-100 text-green-800",
  "Mastery": "bg-orange-100 text-orange-800",
};
