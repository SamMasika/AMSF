<template>
<v-container fluid class="message ">
    <Loader :loading="isLoading"></Loader>
    <v-row>
        <v-spacer></v-spacer>
        <!-- <v-col cols="12" sm="3" md="3" lg="3">
                    <v-text-field v-model="search" append-icon="mdi-magnify" outlined dense class="rounded-lg " color="blue lighten-1 " label="Search"></v-text-field>
                </v-col> -->

    </v-row>
    <v-card elevation="24" class="rounded-lg my-3">
        <v-card-title class="light-blue lighten-4 my-5 blue--text ">
            <!-- <router-link to="/reports" style="text-decoration: none; color: inherit;">
                <h5 class="blue--text text-lighten-1">
                    <v-icon class="blue--text text-lighten-1" size="30">mdi-arrow-left-circle</v-icon>
                </h5>
            </router-link> -->
            <v-spacer></v-spacer>
            <h4 class="text-h5"> Assets Allocated to Office</h4>
            <v-spacer></v-spacer>
            <v-btn @click="printReport" class="btn rounded-lg white--text" color="blue lighten-1" title="Print" elevation="0" v-if="assetsFound">
                <v-icon color="white" class="white--text">mdi-printer</v-icon>Print
            </v-btn>
            <!-- <div class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="blue lighten-1" dark v-bind="attrs" v-on="on" class="btn rounded-lg" elevation="0" medium>
                            ExportTo <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item class="custom-list-item">
                            <v-list-item-title>
                                <v-btn @click="generatePDFReport" text title="Export to Pdf" class="btn">
                                    <v-icon color="red" size="30">mdi-file-pdf-box</v-icon> Pdf
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item class="custom-list-item">
                            <v-list-item-title>
                                <v-btn @click="generateExcelReport" text class="btn">
                                    <v-icon color="blue lighten-1" size="30">mdi-file-excel</v-icon>Excel
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item class="custom-list-item">
                            <v-list-item-title>
                                <v-btn @click="generateCSV" text title="Export to Pdf" class="btn">
                                    <v-icon color="grey" size="30">mdi-file</v-icon> Csv
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div> -->

        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="fetchAssetData">
                <v-row>
                    <v-col cols="12" lg="4" md="4" sm="4">
                    </v-col>
                    <v-col cols="12" sm="4" md="4" lg="4">
                        <v-autocomplete label="--Select Office--" item-text="name" class="rounded-lg" outlined dense item-value="name" color="blue lighten-1" v-model="officeName" :items="offices"></v-autocomplete>
                    </v-col>

                    <v-col cols="12" lg="4" md="4" sm="4">
                        <v-btn type="submit" color="blue lighten-1" class="rounded-lg white--text btn" elevation="0" prepend-icon="mdi-magnify" :loading="loading">
                            <v-icon v-if="!loading">mdi-magnify</v-icon>Search
                            <v-progress-circular indeterminate color="white" v-if="loading">Loading </v-progress-circular>
                        </v-btn>
                    </v-col>
                </v-row>

            </v-form>
        </v-card-text>
        <v-card-text v-if="assetsnotFound" class="text-center">
            <div class="">
                <v-alert text dense color="red" class="text-h5 mx-8" border="left" icon="mdi-delete-empty" >
                    No assets allocated to  <b  class="blue-grey--text">{{officeName}} </b> office
                </v-alert>
            </div>
        </v-card-text>
    </v-card>

    <v-card class="rounded-lg" elevation="24" v-if="assetsFound">
        <v-card-text>
            <v-row class="justify-end">
                <v-col cols="12" sm="4" md="4" lg="4" class="mt-3">
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="assetsByOffice" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer :search="search" class="elevation-0 " @page-count="pageCount = $event">
                <template v-slot:[`item.furniture.furniture_type`]="{ item }">
                    {{ item.furniture?.furniture_type || '---' }}
                </template>
                <template v-slot:[`item.furniture.material`]="{ item }">
                    {{ item.furniture?.material || '---' }}
                </template>
                <template v-slot:[`item.electronic.chapa`]="{ item }">
                    {{ item.electronic?.chapa || '---' }}
                </template>
                <template v-slot:[`item.electronic.serial_no`]="{ item }">
                    {{ item.electronic?.serial_no || '---' }}
                </template>
                <template v-slot:[`item.subcategory`]="{ item }">
                    {{ item?.subcategory || '---' }}
                </template>
            </v-data-table>
            <v-row class="pagination-row mx-8">
                <v-col cols sm="6" md="6" lg="6">
                    <p class="items-range blue--text text-darken-4">
                        <b>Showing {{ startIndex }} - {{ endIndex }} out of {{ assetsByOffice.length }}</b>
                    </p>
                </v-col>
                <v-col cols sm="6" md="6" lg="6" class="text-right">
                    <v-pagination v-model="page" :length="pageCount" circle show-arrows="off" :total-visible="5" class="pagination-no-elevation" prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
                    </v-pagination>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <!--    
    <template > 

    <div v-if="assetsByOffice.length === 0" class="text-center">
        <p class="blue--text text-h6">No assets found for this staff.</p>
    </div>
    </template> -->
    <iframe ref="printFrame" style="display: none;"></iframe>
</v-container>
</template>

<script>
import axios from 'axios';
import logo from '@/assets/logo.png';
import ttcl from '@/assets/ttcl.png';
import {
    categoryOptions,
} from '@/json/enum'
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    name: 'Item',

    data() {
        return {

            isLoading: false,
            loading: false,
            sales: [],
            offices: [],
            categoryOptions,
            assetsByOffice: [],
            officeName: '',
            categoryName: '',
            assetsFound: false,
            assetsnotFound: false,
            search: '',
            page: 1,
            itemsPerPage: 10,
            itemsPerPageOptions: [5, 10, 20, 50],
            pageCount: 0,
            Computer: 0,
            Phone: 0,
            Television: 0,
            Disk: 0,
            Desktop: 0,
            Laptop: 0,
            headers: [
                
                {
                    text: 'Category ',
                    value: 'category',
                },
                {
                    text: 'Sub Category ',
                    value: 'subcategory',
                },
                {
                    text: 'Asset Tag',
                    value: 'asset_tag',
                },
                {
                    text: 'Brand',
                    value: 'electronic.chapa',
                },
                {
                    text: 'Serial Number',
                    value: 'electronic.serial_no',
                },
                {
                    text: 'Furniture Type',
                    value: 'furniture.furniture_type',
                },

                {
                    text: 'Furniture Material',
                    value: 'furniture.material',
                },
            ],
        }
    },

    computed: {
        isElectronicsCategory() {
            return this.categoryName === 'Electronic'; // Change 'Electronics' to the actual value for electronics category
        },
        startIndex() {
            return (this.page - 1) * this.itemsPerPage + 1;
        },
        endIndex() {
            const end = this.page * this.itemsPerPage;
            return end > this.assetsByOffice.length ? this.assetsByOffice.length : end;
        },

        // Calculate the next day after the selected start date
        nextDayAfterStartDate() {
            if (!this.startDate) return null;

            const nextDate = new Date(this.startDate);
            nextDate.setDate(nextDate.getDate() + 1);

            // Format the next date to match the input format
            const formattedNextDate = nextDate.toISOString().split('T')[0];

            return formattedNextDate;
        },

        maxEndDate() {
            const today = new Date();
            const formattedToday = today.toISOString().split('T')[0];
            return formattedToday;
        },

        customDateFormat() {
            return value => {
                if (!value) return '';
                const date = new Date(value);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            };
        },

    },
    methods: {

        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            };
            return date.toLocaleDateString('en-US', options);
        },
        formatPrice(price) {
            // Convert price to a number and handle NaN cases
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice)) {
                return '';
            }

            // Format price with commas for thousands
            return parsedPrice.toLocaleString('en-US');
        },

        async fetchData() {
            this.isLoading = true
            axios.get('/office-list')
                .then(response => {
                    this.offices = response.data.data
                    console.log(response.data.data)
                })

                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                })
        },
        fetchAssetData() {
            this.loading = true;
            axios.get(`/assets-by-office/${this.officeName}/${this.categoryName}`)
                .then(response => {
                    // Handle the successful response
                    this.assetsByOffice = response.data.data;
                    this.Computer = response.data.subcategoriesCount.Computer;
                    this.Phone = response.data.subcategoriesCount.Phone;
                    this.Television = response.data.subcategoriesCount.Television;
                    this.Disk = response.data.subcategoriesCount.Disk;
                    this.Laptop = response.data.subcategoriesCount.Laptop;
                    this.Desktop = response.data.subcategoriesCount.Desktop;
                    this.Table = response.data.subcategoriesCount.Table;
                    this.Chair = response.data.subcategoriesCount.Chair;
                    this.Locker = response.data.subcategoriesCount.Locker;

                    // Check if assets are found
                    this.assetsFound = this.assetsByOffice.length > 0;
                    this.assetsnotFound = this.assetsByOffice.length === 0;

                })
                .catch(error => {
                    // Handle errors
                    console.error('Error fetching assets:', error);
                })
                .finally(() => {
                    // Set loading to false when the request is complete
                    this.loading = false;
                });
        },
        generateReportContent() {
  // Start with an empty string for the invoice content
  let reportContent = '';

  // Add logos, title, and counts
  reportContent += `
    <div style="text-align: center; padding: 10px; margin-top:10px; color: #42A5F5;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <img src="${logo}" style="width: 130px; height: 90px;" />
        <h2 style="font-size: 30px; font-family: 'Open Sans', sans-serif; margin: 0;">Assets Allocated</h2>
        <img src="${ttcl}" style="width: 200px; height: 150px;" />
      </div>
    </div>
    <div style="padding: 10px; font-size: 20px; font-family: 'Open Sans', sans-serif; margin-top: 5px;">
      <p style="text-align: center; margin: 0; ">Office:<b style="">${this.officeName}</b> </p>
    </div>
  `;

  // Add a table for the item details with some styling
  reportContent += `<div style="padding: 20px;">`;
  reportContent += `<table style="width: 100%; border-collapse: collapse; font-family: 'Open Sans', sans-serif; padding: 20px;">
    <thead>
      <tr style="background-color: #607D8B; color: white;">
        <th style="padding: 5px; text-align: left;">Category</th>
        <th style="padding: 5px; text-align: center;">Asset Tag</th>
        <th style="padding: 5px; text-align: center;">Electronic Type</th>
        <th style="padding: 5px; text-align: center;">Furniture Type</th>
        <th style="padding: 5px; text-align: center;">Brand</th>
        <th style="padding: 5px; text-align: center;">Serial Number</th>
        <th style="padding: 5px; text-align: center;">Furniture Material</th>
      </tr>
    </thead>
    <tbody>`;

  this.assetsByOffice.forEach((item, index) => {
    // Alternate row background color
    const rowColor = index % 2 === 0 ? '#F5F5F5' : 'white';

    reportContent += `<tr style="background-color: ${rowColor};">
        <td style="padding: 10px; border-bottom: 1px  #ccc;">${item.category || '---'}</td>
        <td style="padding: 10px; text-align: center; border-bottom: 1px  #ccc;">${item.asset_tag || '---'}</td>
        <td style="padding: 10px; text-align: center; border-bottom: 1px  #ccc;">${item.subcategory || '---'}</td>
        <td style="padding: 10px; text-align: center; border-bottom: 1px  #ccc;">${item.furniture ? item.furniture.furniture_type || '---' : '---'}</td>
        <td style="padding: 10px; text-align: center; border-bottom: 1px  #ccc;">${item.electronic ? item.electronic.chapa || '---' : '---'}</td>
        <td style="padding: 10px; text-align: center; border-bottom: 1px  #ccc;">${item.electronic ? item.electronic.serial_no || '---' : '---'}</td>
        <td style="padding: 10px; text-align: center; border-bottom: 1px  #ccc;">${item.furniture ? item.furniture.material || '---' : '---'}</td>
      </tr>`;
  });

  // Add the closing tags for the table and container
  reportContent += `
      </tbody>
    </table>
  </div>`;
  reportContent += `</div>`;
  reportContent += `<div style="padding: 20px;">`;
  reportContent += `
    <div style="text-align: center; margin-top: 20px; font-size: 16px; font-family: 'Open Sans', sans-serif; style="padding: 20px;">
      <p>Phone(s): <span style="color: #42A5F5;">${this.Phone}</span>,       Computer(s): <span style="color: #42A5F5;">${this.Computer}</span></p>
      <p>Television(s): <span style="color: #42A5F5;">${this.Television}</span>,     Disk(s): <span style="color: #42A5F5;">${this.Disk}</span></p>
      <p>Chair(s): <span style="color: #42A5F5;">${this.Chair}</span>,     Table(s):<span style="color: #42A5F5;"> ${this.Table}</span></p>
      <p>Locker(s):<span style="color: #42A5F5;"> ${this.Locker}</span>,</p>
    </div>
  `;
  return reportContent;
},

        printReport() {
            // Get the invoice content from the computed property
            const reportContent = this.generateReportContent();

            // Get the reference to the hidden iframe
            const printFrame = this.$refs.printFrame;

            // Create a new document in the iframe
            const printDocument = printFrame.contentWindow.document;

            // Write the invoice content to the iframe's document
            printDocument.open();
            printDocument.write(reportContent);
            printDocument.close();

            // Trigger the print dialog in the iframe
            printFrame.contentWindow.print();
        },

        generateExcelReport() {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Assets By Staff Report');

            // Add headers to the worksheet
            const headerRow = worksheet.addRow(this.headers.map(header => header.text));
            headerRow.font = {
                bold: true
            };

            // Add data to the worksheet
            this.sales.forEach(item => {
                worksheet.addRow([
                    item.category,
                    item.subcategory,
                    item.asset_tag,
                    item.electronic.chapa,
                    item.electronic.serial_no,
                ]);
            });

            // Set column widths
            worksheet.columns.forEach(column => {
                column.width = 15;
            });

            // Generate a unique filename for the Excel file
            const fileName = `assets_by_staff_report_${new Date().getTime()}.xlsx`;

            // Save the workbook to a blob
            workbook.xlsx.writeBuffer().then(data => {
                const blob = new Blob([data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                const url = window.URL.createObjectURL(blob);

                // Create a link to download the file
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();

                // Clean up the object URL
                window.URL.revokeObjectURL(url);
            });
        },
        generatePDFReport() {
            const pdf = new jsPDF();

            // Add title, logos, and staff name
            pdf.setFontSize(20);
            pdf.setTextColor(66, 165, 245);
            pdf.text(' Assets Allocated', 105, 20, null, null, 'center');

            const leftLogoDataUrl = logo;
            pdf.addImage(leftLogoDataUrl, 'PNG', 20, 10, 30, 20); // Adjust width and height as needed

            const rightLogoDataUrl = ttcl;
            const pageWidth = pdf.internal.pageSize.getWidth();
            pdf.addImage(rightLogoDataUrl, 'PNG', pageWidth - 50, 10, 30, 20); // Adjust width and height as needed

            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            const officeNameText = `Office: ${this.officeName}`;
            const officeNameWidth = pdf.getStringUnitWidth(officeNameText) * 12 / pdf.internal.scaleFactor;
            const centerPosition = (pageWidth - officeNameWidth) / 2;
            pdf.text(officeNameText, centerPosition, 40);

            // Calculate the position for the table
            const tableStartY = 50; // Adjust the Y position as needed

            // Add a table for the item details
            const tableData = this.assetsByOffice.map(item => [
                item.category || '---', // Default to '---' if category is null
                item.subcategory || '---', // Default to '---' if subcategory is null
                item.asset_tag || '---',
                item.electronic ? item.electronic.chapa || '---' : '---', // Check if electronic is not null
                item.electronic ? item.electronic.serial_no || '---' : '---', // Check if electronic is not null
                item.furniture ? item.furniture.furniture_type || '---' : '---', // Check if furniture is not null
                item.furniture ? item.furniture.material || '---' : '---', // Check if furniture is not null
            ]);

            pdf.autoTable({
                startY: tableStartY, // Adjust the Y position
                head: [
                    ['Category', 'Electronic Type', 'Asset Tag', 'Model', 'Serial Number', 'Furniture Type', 'Furniture Material'],
                ],
                body: tableData,
                theme: 'striped',
                styles: {
                    halign: 'center',
                },
            });

            // Calculate the position for displaying counts below the table
            const countsStartY = pdf.autoTable.previous.finalY + 20;

            // Add counts below the table
            pdf.setFontSize(11);
            pdf.setTextColor(0, 0, 30);
            pdf.text(`Phones: ${this.Phone},   Computers: ${this.Computer}`, 15, countsStartY);
            pdf.text(`Television: ${this.Television},   Disk: ${this.Disk}`, 15, countsStartY + 5);

            // ... (existing code)

            // Generate a unique filename for the PDF file
            const fileName = `electronic_assets_allocated_report_${new Date().getTime()}.pdf`;

            // Save the PDF
            pdf.save(fileName);
        },

        generateCSV() {
            const csvContent = this.generateCSVContent();
            const blob = new Blob([csvContent], {
                type: 'text/csv'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'sales_report.csv';
            link.click();
            URL.revokeObjectURL(url);
        },

        generateCSVContent() {
            const headers = [
                'Customer',
                'Sale No.',
                'Sales Date',
                'Grand Total(Tsh)',
            ];

            const data = this.sales.map(item => [
                item.customer.name,
                item.sale_code,
                this.formatDate(item.sales_date), // Format sales_date
                this.formatPrice(item.totalsales_price), // Format totalsales_price
            ]);

            const csvRows = [headers.join(',')]; // Add headers

            data.forEach(row => {
                const csvRow = row.map(cell => `"${cell}"`).join(',');
                csvRows.push(csvRow);
            });

            return csvRows.join('\n');
        },

    },

    mounted() {
        this.fetchData();

    },

}
</script>

<style>
.btn {
    text-transform: none !important;
}

.toaster-alert {
    width: 800px;
    height: 200px;
    font-size: 24px;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
}

.custom-dialog {
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
</style>
