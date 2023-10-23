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
            <router-link to="/reports" style="text-decoration: none; color: inherit;">
                <h5 class="blue--text text-lighten-1">
                    <v-icon class="blue--text text-lighten-1" size="30">mdi-arrow-left-circle</v-icon>
                </h5>
            </router-link>
            <v-spacer></v-spacer>
            <h4 class="text-h5"> Assets Assigned to Staff</h4>
            <v-spacer></v-spacer>
            <v-btn @click="printReport" class="btn rounded-lg" color="" title="Print" text elevation="0">
                <v-icon color="blue lighten-1">mdi-printer</v-icon>
            </v-btn>
            <div class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="blue lighten-1" dark v-bind="attrs" v-on="on" class="btn rounded-lg" elevation="0" medium>
                            ExportTo <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item class="custom-list-item">
                            <v-list-item-title>
                                <v-btn @click="generatePDFReport" text title="Export to Pdf">
                                    <v-icon color="red" size="30">mdi-file-pdf-box</v-icon> Pdf
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item class="custom-list-item">
                            <v-list-item-title>
                                <v-btn @click="generateExcelReport" text>
                                    <v-icon color="green" size="30">mdi-file-excel</v-icon>Excel
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item class="custom-list-item">
                            <v-list-item-title>
                                <v-btn @click="generateCSV" text title="Export to Pdf">
                                    <v-icon color="grey" size="30">mdi-file</v-icon> Csv
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="fetchAssetData">
                <v-row>
                    <v-col cols="12" lg="2" md="2" sm="2">
                    </v-col>
                    <v-col cols="12" sm="4" md="4" lg="4">
                        <v-autocomplete label="--Select Staff--" item-text="lname" class="rounded-lg" outlined dense item-value="lname" color="blue lighten-1" v-model="staffName" :items="staffs"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" lg="4">
                        <v-select label="--Category--" class="rounded-lg" outlined dense :items="categoryOptions" v-model="categoryName" :rules="categoryRules"></v-select>
                    </v-col>

                    <v-col cols="12" lg="2" md="2" sm="2">
                        <v-btn type="submit" color="blue lighten-1" class="rounded-lg white--text btn" elevation="0" prepend-icon="mdi-magnify">
                            <v-icon>mdi-magnify</v-icon>Search
                        </v-btn>
                    </v-col>
                </v-row>

            </v-form>
        </v-card-text>
    </v-card>
    <v-row class="my-3" v-if="isElectronicsCategory">
        <v-col cols="12" sm="6" md="6">
            <v-card class="rounded-lg " elevation="24">
                <v-card-text>
                    <div align="center" justify="center" class="my-2">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <v-avatar class="rounded-xl  blue accent-3 mx-5" size="50">
                                <v-icon class="white--text">mdi-laptop</v-icon>
                            </v-avatar>
                            <span>
                                <h2>{{Laptop}}</h2>
                                <h3 class=" blue--text">Laptops</h3>
                            </span>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6">
            <v-card class="rounded-lg " elevation="24">
                <v-card-text>
                    <div align="center" justify="center" class="my-2">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <v-avatar class="rounded-xl  blue accent-2 mx-5" size="50">
                                <v-icon class="white--text">mdi-desktop-classic</v-icon>
                            </v-avatar>
                            <span>
                                <h2>{{Desktop}}</h2>
                                <h3 class="blue--text">Desktops</h3>
                            </span>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-card class="rounded-lg" elevation="24">
        <v-card-text>
            <v-row class="justify-end">
                <v-col cols="12" sm="4" md="4" lg="4" class="mt-3">
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="assetsByStaff" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer :search="search" class="elevation-0 " @page-count="pageCount = $event">
            </v-data-table>
            <v-row class="pagination-row mx-8">
                <v-col cols sm="6" md="6" lg="6">
                    <p class="items-range blue--text text-darken-4">
                        <b>Showing {{ startIndex }} - {{ endIndex }} out of {{ assetsByStaff.length }}</b>
                    </p>
                </v-col>
                <v-col cols sm="6" md="6" lg="6" class="text-right">
                    <v-pagination v-model="page" :length="pageCount" circle show-arrows="off" :total-visible="5" class="pagination-no-elevation" prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
                    </v-pagination>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
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
            salesOrders: [],
            sales: [],
            staffs: [],
            categoryOptions,
            assetsByStaff: [],
            staffName: '',
            categoryName: '',
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
            headers: [{
                    text: 'Subcategory ',
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
            return end > this.assetsByStaff.length ? this.assetsByStaff.length : end;
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
            // axios.get('/sales-list')
            //     .then(response => {
            //         this.salesOrders = response.data.data
            //         console.log(response.data.data)
            //     })
            axios.get('/staff-list')
                .then(response => {
                    this.staffs = response.data.data
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
            axios.get(`/assets-by-staffcategory/${this.staffName}/${this.categoryName}`)
                .then(response => {
                    // Handle the successful response
                    this.assetsByStaff = response.data.data;
                    this.Computer = response.data.subcategoriesCount.Computer;
                    this.Phone = response.data.subcategoriesCount.Phone;
                    this.Television = response.data.subcategoriesCount.Television;
                    this.Disk = response.data.subcategoriesCount.Disk;
                    this.Laptop = response.data.subcategoriesCount.Laptop;
                    this.Desktop = response.data.subcategoriesCount.Desktop;

                })
                .catch(error => {
                    // Handle errors
                    console.error('Error fetching assets:', error);
                });
        },
        generateReportContent() {
            // Start with an empty string for the invoice content
            let reportContent = '';

            // Add the header of the invoice with some styling
            reportContent += '<div style="text-align: center;  color: #42A5F5; padding: 10px;"><h2>Assets by Staff</h2></div>';

            reportContent += `<div style="padding: 20px;">`;
            // Add a table for the item details with some styling
            reportContent += `<table style="width: 100%; border-collapse: collapse; ">
          <thead>
            <tr style="background-color: #42A5F5; color:white;">
              <th style="padding: 10px; text-align: left;">Category</th>
              <th style="padding: 10px; text-align: center; ">Subcategory</th>
              <th style="padding: 10px; text-align: center;">Asset Tag</th>
              <th style="padding: 10px; text-align: center;"> Brand</th>
              <th style="padding: 10px; text-align: center;"> Serial Number</th>
            </tr>
          </thead>
          <tbody>`;

            // Loop through the cartItems to add each item to the table
            this.assetsByStaff.forEach((item) => {

                reportContent += `<tr>
            <td style="padding: 10px; border-bottom: 1px solid #ccc;">${item.category}</td>
            <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ccc;">${item.subcategory}</td>
            <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ccc;">${item.asset_tag}</td>
            <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ccc;">${item.electronic.chapa}</td>
            <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ccc;">${item.electronic.serial_no}</td>
          </tr>`;
            });

            // Add the total quantity and total price at the end of the table with some styling
            reportContent += `
        </tbody>
      </table>`;
            reportContent += `</div>`;
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

            // Add title
            pdf.setFontSize(18);
            pdf.setTextColor(66, 165, 245); // Set text color
            pdf.text('Asset by Staff Report', 105, 20, null, null, 'center'); // Centered text

            const leftLogoDataUrl = logo; // Use the imported left logo image
            pdf.addImage(leftLogoDataUrl, 'PNG', 10, 10, 30, 20); // Adjust the coordinates and size as needed

            const rightLogoDataUrl = ttcl; // Use the imported right logo image
            const pageWidth = pdf.internal.pageSize.getWidth();
            pdf.addImage(rightLogoDataUrl, 'PNG', pageWidth - 50, 10, 30, 30);
            // Add staff name
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0); // Set text color to black
            const staffNameText = `Staff: ${this.staffName}`;
            const staffNameWidth = pdf.getStringUnitWidth(staffNameText) * 12 / pdf.internal.scaleFactor; // Assuming font size is 12
            const centerPosition = (pageWidth - staffNameWidth) / 2;
            pdf.text(staffNameText, centerPosition, 55);
            // Add a table for the item details
            const tableData = this.assetsByStaff.map(item => [
                item.category,
                item.subcategory,
                item.asset_tag, // Format sales_date
                item.electronic.chapa, // Format totalsales_price
                item.electronic.serial_no, // Format totalsales_price
            ]);

            pdf.autoTable({
                startY: 40,
                head: [
                    [
                        'Category',
                        'Subcategory',
                        'Asset Tag',
                        'Model',
                        'Serial Number',
                    ],
                ],
                body: tableData,
                theme: 'striped', // You can choose different themes
                styles: {
                    halign: 'center'
                }, // Center-align text in cells
            });
            

            // Generate a unique filename for the PDF file
            const fileName = `assets_by_staff_report_${new Date().getTime()}.pdf`;

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
