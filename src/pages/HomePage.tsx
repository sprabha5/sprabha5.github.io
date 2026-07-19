import React from 'react';
import { Box, Typography, Stack, Container, Divider } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';

type MonthYear = {
    year: number;
    month: number;
};

type Experience = {
    company: string;
    role: string;
    type: string;
    start: MonthYear;
    end?: MonthYear;
    location: string;
    description?: string;
};

const experienceData = [
    {
        company: 'SLB',
        role: 'Electrical Engineer',
        type: 'Full-time',
        start: { year: 2025, month: 10 },
        location: 'Pune · On-site',
        description: '',
    },
    {
        company: 'Arbor Mobility Private Limited',
        role: 'Power electronics Hardware Engineer',
        type: 'Full-time',
        start: { year: 2024, month: 8 },
        end: { year: 2025, month: 8 },
        location: 'Bengaluru, Karnataka, India · On-site',
        // description: '• Enhanced the Battery Management System (BMS) by optimizing circuit design, analyzing schematics, and selecting components based on requirements, lifecycle, and availability.\n• Reduced BMS BOM costs through strategic component selection and sourcing.\n• Improved PCB layouts, coordinated with manufacturers, and resolved design exceptions.\n• Designed and executed hardware test plans, debugging BMS and other electric bike circuits.\n• Collaborated with the firmware team to ensure seamless BMS functionality.\n• Conducted electrical and thermal simulations using Altium, LTSpice, and Ansys Electronics Desktop.\n• Selected MOSFETs and components for high-current PCB designs, enabling up to 160A handling.\n• Documented development processes comprehensively and integrated hardware with vehicle systems.',
        // skills: 'Battery Management Systems, Printed Circuit Board (PCB) Design and +5 skills',
    },
    {
        company: 'Luminous Power Technologies (P) Ltd',
        role: 'Power Electronics Engineer',
        type: 'Internship',
        start: { year: 2024, month: 5 },
        end: { year: 2024, month: 8 },
        location: 'Gurugram, Haryana, India · On-site',
        // description: '• Worked in the High-Frequency Inverter team focusing on PCB testing and debugging.\n• Studied and tested Bi-directional Phase-Shifted Full Bridge (PSFB) and Totem Pole PFC topologies, analyzing hardware and reference designs.\n• Involved in schematic reviews, PCB layout design verification, and hardware testing\n• Simulated losses and thermal effects of various converters PSFB topology in PLECS for design optimization.\n• Conducted GRID-tied inverter product functional testing (3kW, 5kW, 10kW) and documented results.\n• Analyzed oscilloscope waveforms for high-frequency noise and implemented tuning techniques.',
        // skills: 'PCB testing & Debugging, High frequency Inverter and +1 skill',
    },
    {
        company: 'Indian Institute of Technology Dharwad',
        role: 'Research Project Intern',
        type: 'Internship',
        start: { year: 2022, month: 4 },
        end: { year: 2022, month: 7 },
        location: 'Dharwad, India',
        // description: 'Analysis of Lingustic Information transfer while performing direct speech-to-speech translation using Bi-LSTM\n• Extracted speech features for input data preprocessing.\n• Implemented and trained a Bi-LSTM model for speech translation.\n• Collaborated with the research team to design and execute experiments.\n• Evaluated and fine-tuned the model for improved translation accuracy.\n• Generated translated speech outputs for analysis and comparison\n• Contributed to the advancement of speech translation technology, and achieved a 78% improvement in translation accuracy over the baseline.\n• Published research findings in 26th International Conference of the ORIENTAL- COCOSDA',
        // skills: 'Machine Learning, MATLAB and +1 skill',
    }
] satisfies Experience[];

const monthFormatter = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    year: 'numeric',
});

const toDate = ({ year, month }: MonthYear) => new Date(year, month - 1, 1);

const formatMonthYear = (date: MonthYear) => monthFormatter.format(toDate(date));

const formatDuration = (start: MonthYear, end: MonthYear) => {
    const totalMonths = Math.max(1, (end.year - start.year) * 12 + end.month - start.month + 1);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const parts = [];
    if (years > 0) {
        parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
    }
    if (months > 0) {
        parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
    }

    return parts.join(' ');
};

const formatExperiencePeriod = (experience: Experience, currentDate = new Date()) => {
    const end = experience.end ?? {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
    };

    const endLabel = experience.end ? formatMonthYear(experience.end) : 'Present';
    return `${formatMonthYear(experience.start)} - ${endLabel} · ${formatDuration(experience.start, end)}`;
};

const educationData = [
    {
        institution: 'Indian Institute of Technology, Dharwad, India',
        degree: 'Btech, Electrical Engineering',
        period: '2020 - 2024'
    }
];

const introParagraphs = [
    "Hello, I'm a Power Electronics Engineer and an Electrical Engineering graduate from IIT Dharwad, with hands-on experience in automotive and inverter systems, including DC-DC converters, Battery Management Systems (BMS), and inverters.",
    'At Arbor Mobility, I optimized BMS hardware by improving circuit design, reducing BOM cost, and refining PCB layout, component selection, testing, and end-to-end hardware development. I collaborated closely with firmware teams for seamless integration and conducted electrical and thermal simulations using Altium and Ansys, enabling high-current PCB designs for EV applications.',
    'Previously, I interned at Luminous Power Technologies in the high-frequency inverter team, where I worked on PCB testing and debugging, studied bidirectional and totem-pole topologies, and contributed to schematic and PCB layout reviews.',
    'During my B.Tech, I worked on DC-DC converter topologies, PCB design, and electrical simulations. I also completed a long-term project on an HV isolated differential probe, taking it from prototype to product design, and co-authored a research paper with two teammates.',
    'Apart from engineering, I enjoy writing and sharing my perspectives, reading books, and exploring new topics. I care deeply about spreading knowledge and helping others, and I plan to continue doing that for as long as I can.'
];

const HomePage: React.FC = () => {
    return (
        <Container maxWidth={false} disableGutters sx={{ pb: 4 }}>
            <Stack spacing={4} divider={<Divider flexItem sx={{ borderColor: 'divider' }} />}>
                <Box>
                    <Typography variant="h4" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 800 }}>
                        <PersonIcon color="primary" fontSize="large" /> About
                    </Typography>
                    <Stack spacing={1.5}>
                        {introParagraphs.map((paragraph, index) => (
                            <Typography key={index} variant="body1" color="text.secondary" sx={{ textAlign: { xs: 'left', sm: 'justify' } }}>
                                {paragraph}
                            </Typography>
                        ))}
                    </Stack>
                </Box>

                <Box>
                    <Typography variant="h4" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 800 }}>
                        <WorkIcon color="primary" fontSize="large" /> Experience
                    </Typography>
                    <Stack spacing={2.5}>
                        {experienceData.map((exp, index) => (
                            <Box key={index}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>{exp.role}</Typography>
                                <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                                    {exp.company} · {exp.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                    {formatExperiencePeriod(exp)} | {exp.location}
                                </Typography>
                                {exp.description && (
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 1.5 }}>
                                        {exp.description}
                                    </Typography>
                                )}
                                {/* {exp.skills && (
                                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                                        <Typography variant="body2" fontWeight={600}>
                                            Skills: <Typography component="span" variant="body2" color="text.secondary">{exp.skills}</Typography>
                                        </Typography>
                                    </Box>
                                )} */}
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Box>
                    <Typography variant="h4" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 800 }}>
                        <SchoolIcon color="primary" fontSize="large" /> Education
                    </Typography>
                    <Stack spacing={2.5}>
                        {educationData.map((edu, index) => (
                            <Box key={index}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>{edu.institution}</Typography>
                                <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                                    {edu.degree}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {edu.period}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default HomePage;
