import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, AlignmentType, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { XLSXCompat as XLSX } from '@/utils/excel.js';

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount || 0);
};

// Format date
const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// ==================== WORD EXPORT ====================

export const generateWordReport = async (reportType, data) => {
    const sections = [];

    // Title
    sections.push(
        new Paragraph({
            text: 'Income & Capital Report',
            heading: 'Heading1',
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: `Report Type: ${getReportTypeName(reportType)}`,
                    bold: true
                })
            ],
            spacing: { after: 200 }
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: `Generated: ${formatDate()}`,
                    italics: true
                })
            ],
            spacing: { after: 400 }
        })
    );

    // Add sections based on report type
    if (reportType === 'full' || reportType === 'assets') {
        sections.push(...generateAssetsSection(data));
    }

    if (reportType === 'full' || reportType === 'revenue') {
        sections.push(...generateRevenueSection(data));
    }

    if (reportType === 'full' || reportType === 'capital') {
        sections.push(...generateCapitalSection(data));
    }

    if (reportType === 'full' || reportType === 'liabilities') {
        sections.push(...generateLiabilitiesSection(data));
    }

    if (reportType === 'full' || reportType === 'health') {
        sections.push(...generateHealthSection(data));
    }

    // Create document
    const doc = new Document({
        sections: [{
            properties: {},
            children: sections
        }]
    });

    // Generate and download
    const blob = await Packer.toBlob(doc);
    const fileName = `Income_Capital_Report_${reportType}_${new Date().toISOString().split('T')[0]}.docx`;
    saveAs(blob, fileName);
};

// Helper function to create section header
const createSectionHeader = (title) => {
    return new Paragraph({
        text: title,
        heading: 'Heading2',
        spacing: { before: 400, after: 200 }
    });
};

// Generate Assets Section
const generateAssetsSection = (data) => {
    const sections = [];

    sections.push(createSectionHeader('Assets'));

    // Internal Assets
    if (data.internalAssets && data.internalAssets.length > 0) {
        sections.push(
            new Paragraph({
                text: 'Internal Assets',
                bold: true,
                spacing: { before: 200, after: 100 }
            })
        );

        const rows = [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ text: 'Asset Name', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Value', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Items', bold: true })] })
                ]
            }),
            ...data.internalAssets.map(asset =>
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(asset.name || '')] }),
                        new TableCell({ children: [new Paragraph(formatCurrency(asset.value))] }),
                        new TableCell({ children: [new Paragraph((asset.items || []).join(', '))] })
                    ]
                })
            )
        ];

        sections.push(
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows
            })
        );
    }

    // External Assets
    if (data.externalAssets && data.externalAssets.length > 0) {
        sections.push(
            new Paragraph({
                text: 'External Assets',
                bold: true,
                spacing: { before: 300, after: 100 }
            })
        );

        const rows = [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ text: 'Asset Name', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Cost', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Frequency', bold: true })] })
                ]
            }),
            ...data.externalAssets.map(asset =>
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(asset.name || '')] }),
                        new TableCell({ children: [new Paragraph(formatCurrency(asset.cost))] }),
                        new TableCell({ children: [new Paragraph(asset.frequency || '')] })
                    ]
                })
            )
        ];

        sections.push(
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows
            })
        );
    }

    return sections;
};

// Generate Revenue Section
const generateRevenueSection = (data) => {
    const sections = [];

    sections.push(createSectionHeader('Revenue & Costs'));

    // Revenue Streams
    if (data.revenueStreams && data.revenueStreams.length > 0) {
        sections.push(
            new Paragraph({
                text: 'Revenue Streams',
                bold: true,
                spacing: { before: 200, after: 100 }
            })
        );

        const rows = [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ text: 'Source', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Amount', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Frequency', bold: true })] })
                ]
            }),
            ...data.revenueStreams.map(stream =>
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(stream.source || '')] }),
                        new TableCell({ children: [new Paragraph(formatCurrency(stream.amount))] }),
                        new TableCell({ children: [new Paragraph(stream.frequency || '')] })
                    ]
                })
            )
        ];

        sections.push(
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows
            })
        );
    }

    // Receivables
    if (data.receivables && data.receivables.length > 0) {
        sections.push(
            new Paragraph({
                text: 'Receivable Income',
                bold: true,
                spacing: { before: 300, after: 100 }
            })
        );

        const rows = [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ text: 'Customer', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Amount', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Status', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Due Date', bold: true })] })
                ]
            }),
            ...data.receivables.map(receivable =>
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(receivable.customerName || '')] }),
                        new TableCell({ children: [new Paragraph(formatCurrency(receivable.amount))] }),
                        new TableCell({ children: [new Paragraph(receivable.status || '')] }),
                        new TableCell({ children: [new Paragraph(receivable.dueDate || '')] })
                    ]
                })
            )
        ];

        sections.push(
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows
            })
        );
    }

    return sections;
};

// Generate Capital Section
const generateCapitalSection = (data) => {
    const sections = [];

    sections.push(createSectionHeader('Capital & Funding'));

    // Capital Requirements
    if (data.capitalRequirements && data.capitalRequirements.length > 0) {
        sections.push(
            new Paragraph({
                text: 'Capital Requirements',
                bold: true,
                spacing: { before: 200, after: 100 }
            })
        );

        const rows = [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ text: 'Type', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Amount', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Timeline', bold: true })] })
                ]
            }),
            ...data.capitalRequirements.map(req =>
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(req.type || '')] }),
                        new TableCell({ children: [new Paragraph(formatCurrency(req.amount))] }),
                        new TableCell({ children: [new Paragraph(req.timeline || '')] })
                    ]
                })
            )
        ];

        sections.push(
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows
            })
        );
    }

    return sections;
};

// Generate Liabilities Section
const generateLiabilitiesSection = (data) => {
    const sections = [];

    sections.push(createSectionHeader('Liabilities'));

    if (data.liabilities && data.liabilities.length > 0) {
        const rows = [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ text: 'Name', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Amount', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Type', bold: true })] }),
                    new TableCell({ children: [new Paragraph({ text: 'Due Date', bold: true })] })
                ]
            }),
            ...data.liabilities.map(liability =>
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(liability.name || '')] }),
                        new TableCell({ children: [new Paragraph(formatCurrency(liability.amount))] }),
                        new TableCell({ children: [new Paragraph(liability.type || '')] }),
                        new TableCell({ children: [new Paragraph(liability.dueDate || '')] })
                    ]
                })
            )
        ];

        sections.push(
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows
            })
        );
    }

    return sections;
};

// Generate Health Section
const generateHealthSection = (data) => {
    const sections = [];

    sections.push(createSectionHeader('Financial Health'));

    if (data.profitability) {
        sections.push(
            new Paragraph({
                text: 'Profitability Metrics',
                bold: true,
                spacing: { before: 200, after: 100 }
            }),
            new Paragraph(`1-Year Revenue Growth: ${data.profitability.revenueGrowth1Year || 'N/A'}`),
            new Paragraph(`3-Year Revenue Growth: ${data.profitability.revenueGrowth3Year || 'N/A'}`),
            new Paragraph(`Profit Margin: ${data.profitability.profitMargin || 'N/A'}`),
            new Paragraph(`Break-Even: ${data.profitability.breakEven || 'N/A'}`)
        );
    }

    return sections;
};

// Get report type name
const getReportTypeName = (type) => {
    const names = {
        full: 'Full Financial Report',
        assets: 'Assets Report',
        revenue: 'Revenue & Costs Report',
        capital: 'Capital & Funding Report',
        liabilities: 'Liabilities Report',
        health: 'Financial Health Report'
    };
    return names[type] || type;
};

// ==================== EXCEL EXPORT ====================

export const generateExcelReport = (reportType, data) => {
    const workbook = XLSX.utils.book_new();

    // Add sheets based on report type
    if (reportType === 'full' || reportType === 'assets') {
        addAssetsSheet(workbook, data);
    }

    if (reportType === 'full' || reportType === 'revenue') {
        addRevenueSheet(workbook, data);
    }

    if (reportType === 'full' || reportType === 'capital') {
        addCapitalSheet(workbook, data);
    }

    if (reportType === 'full' || reportType === 'liabilities') {
        addLiabilitiesSheet(workbook, data);
    }

    if (reportType === 'full' || reportType === 'health') {
        addHealthSheet(workbook, data);
    }

    // Generate and download
    const fileName = `Income_Capital_Report_${reportType}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
};

// Add Assets Sheet
const addAssetsSheet = (workbook, data) => {
    const sheetData = [];

    // Internal Assets
    sheetData.push(['Internal Assets']);
    sheetData.push(['Asset Name', 'Value', 'Items']);

    if (data.internalAssets && data.internalAssets.length > 0) {
        data.internalAssets.forEach(asset => {
            sheetData.push([
                asset.name || '',
                asset.value || 0,
                (asset.items || []).join(', ')
            ]);
        });
    }

    sheetData.push([]);

    // External Assets
    sheetData.push(['External Assets']);
    sheetData.push(['Asset Name', 'Cost', 'Frequency']);

    if (data.externalAssets && data.externalAssets.length > 0) {
        data.externalAssets.forEach(asset => {
            sheetData.push([
                asset.name || '',
                asset.cost || 0,
                asset.frequency || ''
            ]);
        });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets');
};

// Add Revenue Sheet
const addRevenueSheet = (workbook, data) => {
    const sheetData = [];

    // Revenue Streams
    sheetData.push(['Revenue Streams']);
    sheetData.push(['Source', 'Amount', 'Frequency', 'Growth']);

    if (data.revenueStreams && data.revenueStreams.length > 0) {
        data.revenueStreams.forEach(stream => {
            sheetData.push([
                stream.source || '',
                stream.amount || 0,
                stream.frequency || '',
                stream.growth || ''
            ]);
        });
    }

    sheetData.push([]);

    // Receivables
    sheetData.push(['Receivable Income']);
    sheetData.push(['Customer', 'Amount', 'Status', 'Due Date', 'Invoice #']);

    if (data.receivables && data.receivables.length > 0) {
        data.receivables.forEach(receivable => {
            sheetData.push([
                receivable.customerName || '',
                receivable.amount || 0,
                receivable.status || '',
                receivable.dueDate || '',
                receivable.invoiceNumber || ''
            ]);
        });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue & Costs');
};

// Add Capital Sheet
const addCapitalSheet = (workbook, data) => {
    const sheetData = [];

    sheetData.push(['Capital Requirements']);
    sheetData.push(['Type', 'Amount', 'Timeline', 'Purpose']);

    if (data.capitalRequirements && data.capitalRequirements.length > 0) {
        data.capitalRequirements.forEach(req => {
            sheetData.push([
                req.type || '',
                req.amount || 0,
                req.timeline || '',
                req.purpose || ''
            ]);
        });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Capital & Funding');
};

// Add Liabilities Sheet
const addLiabilitiesSheet = (workbook, data) => {
    const sheetData = [];

    sheetData.push(['Liabilities']);
    sheetData.push(['Name', 'Amount', 'Type', 'Due Date', 'Creditor', 'Interest Rate']);

    if (data.liabilities && data.liabilities.length > 0) {
        data.liabilities.forEach(liability => {
            sheetData.push([
                liability.name || '',
                liability.amount || 0,
                liability.type || '',
                liability.dueDate || '',
                liability.creditor || '',
                liability.interestRate || ''
            ]);
        });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Liabilities');
};

// Add Health Sheet
const addHealthSheet = (workbook, data) => {
    const sheetData = [];

    sheetData.push(['Financial Health Metrics']);
    sheetData.push([]);

    if (data.profitability) {
        sheetData.push(['Profitability']);
        sheetData.push(['Metric', 'Value']);
        sheetData.push(['1-Year Revenue Growth', data.profitability.revenueGrowth1Year || 'N/A']);
        sheetData.push(['3-Year Revenue Growth', data.profitability.revenueGrowth3Year || 'N/A']);
        sheetData.push(['Profit Margin', data.profitability.profitMargin || 'N/A']);
        sheetData.push(['Break-Even', data.profitability.breakEven || 'N/A']);
    }

    sheetData.push([]);

    if (data.cashFlow) {
        sheetData.push(['Cash Flow']);
        sheetData.push(['Metric', 'Value']);
        sheetData.push(['Monthly Burn Rate', data.cashFlow.burnRate || 'N/A']);
        sheetData.push(['Cash Buffer (Months)', data.cashFlow.bufferMonths || 'N/A']);
        sheetData.push(['Receivables Cycle', data.cashFlow.receivablesCycle || 'N/A']);
        sheetData.push(['Payables Cycle', data.cashFlow.payablesCycle || 'N/A']);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Financial Health');
};
