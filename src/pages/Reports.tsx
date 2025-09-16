import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  BarChart3,
  PieChart,
  FileSpreadsheet,
  Filter,
  Search,
  Shield,
  Cloud
} from "lucide-react";
import { useState } from "react";

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState("");
  const [dateRange, setDateRange] = useState("");

  const reportTypes = [
    {
      title: "Patient Summary Report",
      description: "Comprehensive overview of patient progress and compliance",
      icon: Users,
      color: "bg-gradient-healing"
    },
    {
      title: "Diet Chart Analytics",
      description: "Analysis of diet chart effectiveness and patient outcomes",
      icon: BarChart3,
      color: "bg-gradient-wisdom"
    },
    {
      title: "Ayurvedic Constitution Analysis",
      description: "Dosha distribution and constitutional patterns in patient population",
      icon: PieChart,
      color: "bg-gradient-earth"
    },
    {
      title: "Nutritional Compliance Report",
      description: "Patient adherence to prescribed dietary guidelines",
      icon: TrendingUp,
      color: "bg-primary/10"
    }
  ];

  const sampleReports = [
    {
      name: "Monthly Patient Progress - October 2024",
      type: "Patient Summary",
      date: "2024-10-31",
      size: "2.4 MB",
      status: "Ready"
    },
    {
      name: "Quarterly Diet Chart Effectiveness",
      type: "Analytics",
      date: "2024-10-15",
      size: "1.8 MB",
      status: "Ready"
    },
    {
      name: "Dosha Distribution Analysis Q3",
      type: "Constitution",
      date: "2024-09-30",
      size: "1.2 MB",
      status: "Processing"
    }
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Reports & Documents
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate comprehensive reports and analyze patient data with Ayurvedic insights
          </p>
        </div>

        {/* PDF Generation Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-wisdom/5 border border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
              <Cloud className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Secure PDF Generation
              </h3>
              <p className="text-muted-foreground">
                Reports are generated securely with encrypted storage and access-controlled URLs. 
                All documents are encrypted and access-controlled.
              </p>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              <Shield className="w-3 h-3 mr-1" />
              HIPAA Compliant
            </Badge>
          </div>
        </Card>

        {/* Report Generation */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Generate New Report */}
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Generate New Report
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient-summary">Patient Summary Report</SelectItem>
                    <SelectItem value="diet-analytics">Diet Chart Analytics</SelectItem>
                    <SelectItem value="constitution">Constitution Analysis</SelectItem>
                    <SelectItem value="compliance">Nutritional Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input type="date" id="startDate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input type="date" id="endDate" />
                </div>
              </div>

              <Button variant="healing" className="w-full" disabled={!selectedReportType || !dateRange}>
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </Card>

          {/* Report Templates */}
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Available Report Types
            </h2>

            <div className="space-y-4">
              {reportTypes.map((report, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedReportType(report.title.toLowerCase().replace(/\s+/g, '-'))}
                >
                  <div className={`w-10 h-10 ${report.color} rounded-lg flex items-center justify-center`}>
                    <report.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Recent Reports</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search reports..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {sampleReports.map((report, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-healing rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{report.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={report.status === 'Ready' ? 'default' : 'secondary'}
                    className={report.status === 'Ready' ? 'bg-primary/10 text-primary' : ''}
                  >
                    {report.status}
                  </Badge>
                  {report.status === 'Ready' && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline">
              Load More Reports
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;