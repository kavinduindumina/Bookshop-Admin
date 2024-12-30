import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas

defaults.responsive = true;

const timeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  return `${seconds} seconds ago`;
};

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [selling, setSelling] = useState(null);
  const [currentstock, setstock] = useState(null);

  useEffect(() => {
    if (chartData === null) {
      setTimeout(() => {
        fetchRevenueData();
        fetchSelling();
        stock();
      }, 3000);
    }
  }, [chartData]);

  const fetchRevenueData = async () => {
    try {
      await axios
        .get("https://localhost:7248/api/Report/best-selling-books")
        .then((response) => {
          setChartData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          toast.error("Error fetching Selling data " + error);
        });
    } catch (error) {
      console.error("Error fetching Selling data:", error);
    }
  };

  const fetchSelling = async () => {
    try {
      await axios
        .get("https://localhost:7248/api/Report/sales-vs-cancelled")
        .then((response) => {
          setSelling(response.data);
        })
        .catch((error) => {
          toast.error("Error fetching Selling data " + error);
        });
    } catch (error) {
      toast.error("Error fetching Selling data " + error);
    }
  };

  const stock = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://localhost:7248/api/Report/stock-levels"
      );
      setstock(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching stock data " + error);
      setIsLoading(false);
    }
  };

  const updatedAt = new Date();

  const downloadPDF = async () => {
    setIsDownloading(true);
    const pdf = new jsPDF();
    const content = document.querySelector("#analytics-content");
    const canvas = await html2canvas(content, {
      useCORS: true,
      scale: 4,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 190; // Width in mm
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width; // Width of the page
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add image as base64 above the title
    const base64Image = "// Add your base64 image here";
    const imgBase64Width = 25; // Width of base64 image
    const imgBase64Height = 25; // Height of base64 image
    const imgX = (pageWidth - imgBase64Width) / 2; // Center the image horizontally

    pdf.addImage(base64Image, "PNG", imgX, 20, imgBase64Width, imgBase64Height); // Add centered image
    position = 20 + imgBase64Height + 10; // Adjust position after adding base64 image

    // Add title and created date below the image
    const title = "City Taxi Analytics Report";
    const createdAt = new Date(); // Get the current date
    const formattedDate = createdAt.toLocaleString(); // Format the date to a readable string

    pdf.setFontSize(18); // Set font size for the title
    const titleWidth = pdf.getTextDimensions(title).w; // Get the width of the title text
    const titleX = (pageWidth - titleWidth) / 2; // Center the title

    pdf.text(title, titleX, position); // Add centered title
    position += 10; // Adjust position for the date

    pdf.setFontSize(12); // Set font size for the date
    const dateWidth = pdf.getTextDimensions(`Created on: ${formattedDate}`).w; // Get the width of the date text
    const dateX = (pageWidth - dateWidth) / 2; // Center the date

    pdf.text(`Created on: ${formattedDate}`, dateX, position); // Add centered created date

    position += 10; // Adjust position after the title and date

    // Add content image (analytics content)
    const contentX = (pageWidth - imgWidth) / 2; // Center the content image
    pdf.addImage(imgData, "PNG", contentX, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - position;

    while (heightLeft >= 0) {
      pdf.addPage();
      position = 0;
      pdf.addImage(imgData, "PNG", contentX, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`analytics-report-${createdAt.toLocaleString()}.pdf`);
    setIsDownloading(false);
  };

  return (
    <div className="card shadow">
      <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
        <Link to="/dashboard">
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
        <h5 className="m-0 font-weight-bold text-primary">Analytics</h5>
        {/* <button
          onClick={downloadPDF}
          className="btn btn-primary"
          style={{ width: "170px" }}
          disabled={isDownloading}
        >
          {isDownloading ? "Please wait..." : "Download as PDF"}
        </button> */}
        <div>{""}</div>
      </div>
      <div className="card-body" id="analytics-content">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
           <div className="row">
              <div className="chart-container mb-5 col">
                <h4 className="text-primary text-center">Stock Levels</h4>
                <div className="d-flex justify-content-center">
                  {currentstock === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <Bar data={currentstock} 
                    options={{
                      maintainAspectRatio: false, // Allows custom sizing
                    }}
                    height={300} // Set desired height
                    />
                  )}
                </div>
              </div>
              
            </div>
            <div className="row">
              <div className="chart-container mb-5 col">
                <h4 className="text-primary text-center">Best-Selling Books</h4>
                <div className="d-flex justify-content-center">
                  {chartData === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <Line data={chartData} />
                  )}
                </div>
              </div>
              <div className="chart-container mb-5 col w-25">
                <h4 className="text-primary text-center">Sales</h4>
                <div className="d-flex justify-content-center">
                  {selling === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <Pie
                      data={selling}
                      options={{
                        maintainAspectRatio: false, // Allows custom sizing
                      }}
                      width={300} // Set desired width
                      height={300} // Set desired height
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <p className="text-muted text-sm" style={{ fontSize: "10px" }}>
          <i className="fas fa-check-circle me-2 text-success"></i>
          Last Updated: <span>{timeAgo(updatedAt)}</span> on{" "}
          {updatedAt.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Analytics;
