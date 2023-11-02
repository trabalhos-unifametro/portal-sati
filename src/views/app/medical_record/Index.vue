<script lang="ts">
import {defineComponent} from 'vue'
import { useRoute } from 'vue-router'
import Card from "@/components/Card.vue";
import {jsPDF} from "jspdf";
import Printer from 'vue-material-design-icons/Printer.vue'
import Download from 'vue-material-design-icons/Download.vue'

const pdf = new jsPDF('l', 'pt', [1450, 1000])
export default defineComponent({
  components: { Card, Printer, Download },
  data: () => ({
    route: useRoute()
  }),
  methods: {
    downloadMedicalRecord(printOrDownload = 'print') {
      const body: string | HTMLElement = document.getElementById("doc-pdf") ?? 'Documento não encontrado'
      this.imageToUri('/src/assets/images/logo.png', function(uri: string) {
        if (uri.length > 0) {
          pdf.html(body, {
            callback: function (doc) {
              doc.addImage({
                imageData: uri,
                format: 'PNG',
                x: 551,
                y: 20,
                width: 349,
                height: 171,
              })

              if (printOrDownload === 'print') {
                doc.autoPrint();
                window.open(doc.output('bloburl'), '_blank');
              } else {
                doc.save("prontuario-medico.pdf");
              }
            },
            x: 10,
            y: 180
          });
        } else {
          pdf.html(body, {
            callback: function (doc) {
              doc.setFontSize(30)
              doc.setTextColor("#1C6F77")
              doc.text('Hospital Medical Care', 590, 70, { renderingMode: "fill" })
              doc.setFontSize(25)
              doc.setTextColor("#000000")
              doc.text('Prontuário médico', 635, 110)

              if (printOrDownload === 'print') {
                doc.autoPrint();
                window.open(doc.output('bloburl'), '_blank');
              } else {
                doc.save("prontuario-medico.pdf");
              }
            },
            x: 10,
            y: 150
          });
        }
      });
    },
    imageToUri(url: string, callback: Function) {
      const canvas: any = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');
      const base_image: any = new Image();

      base_image.src = url;
      base_image.onload = function() {
        canvas.width = base_image.width;
        canvas.height = base_image.height;
        ctx.drawImage(base_image, 0, 0);
        callback(canvas.toDataURL('image/png'));
        canvas.remove();
      }
    }
  }
})
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
     <div class="d-flex align-items-center">
       <router-link :to="{ name: 'unit', params: { id: route.params.id } }" class="title-page" v-if="route.name === 'medical-record-unit'">Unidade {{ route.params.id }}</router-link>
       <router-link :to="{ name: 'patients' }" class="title-page" v-else>Pacientes</router-link>
       <i class="bi-chevron-right fw-bold ms-2 me-2 font-color-black-10"></i>
       <div class="title-page">Prontuário</div>
     </div>
      <div class="d-flex">
        <button type="button" class="btn btn-primary me-2" @click="downloadMedicalRecord('print')">
          <div class="d-flex justify-content-center align-items-center ps-4 pe-4">
            <printer :size="20"></printer>
            <span class="font-size-20px fw-semibold ms-2">Imprimir</span>
          </div>
        </button>
        <button type="button" class="btn btn-outline-primary" @click="downloadMedicalRecord('download')">
          <div class="d-flex justify-content-center align-items-center ps-4 pe-4">
            <download :size="20"></download>
            <span class="font-size-20px fw-semibold ms-2">Baixar</span>
          </div>
        </button>
      </div>
    </div>
    <v-row>
      <v-col cols="12">
        <card classes="p-4" id="doc-pdf">
          <template #content-with-body>
            <v-row>
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Número do prontuário: </div>
              </v-col>
              <v-col cols="6" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
              <v-col cols="4" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Data de abertura: </div>
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Nome completo: </div>
              </v-col>
              <v-col cols="10" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Data de nascimento: </div>
              </v-col>
              <v-col cols="4" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
              <v-col cols="6" classes="d-flex justify-content-end align-items-center">
                <div class="text-nowrap me-5">Gênero: </div>
                <div class="me-2">M</div>
                <input class="form-control form-mr-readonly w-40px" disabled readonly />
                <div class="ms-4 me-2">F</div>
                <input class="form-control form-mr-readonly w-40px" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Endereço: </div>
              </v-col>
              <v-col cols="10" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Telefone: </div>
              </v-col>
              <v-col cols="4" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Email: </div>
              </v-col>
              <v-col cols="4" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="12" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Nome, telefone ou outro tipo de contato do responsável/cuidador (se aplicável): </div>
              </v-col>
              <v-col cols="12" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="3" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Médico(s) do paciente (se houver): </div>
              </v-col>
              <v-col cols="9" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Escolaridade: </div>
              </v-col>
              <v-col cols="4" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Ocupação: </div>
              </v-col>
              <v-col cols="4" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Limitação: </div>
              </v-col>
              <v-col cols="5" classes="d-flex justify-content-start align-items-center">
                <div class="me-2">Cognitiva</div>
                <input class="form-control form-mr-readonly w-40px" disabled readonly />
                <div class="ms-4 me-2">Locomoção</div>
                <input class="form-control form-mr-readonly w-40px" disabled readonly />
                <div class="ms-4 me-2">Visão</div>
                <input class="form-control form-mr-readonly w-40px" disabled readonly />
                <div class="ms-4 me-2">Audição</div>
                <input class="form-control form-mr-readonly w-40px" disabled readonly />
              </v-col>
              <v-col cols="5" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Outras: </div>
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-4">
              <v-col cols="2" classes="d-flex justify-content-start align-items-center">
                <div class="text-nowrap me-3">Alergia: </div>
              </v-col>
              <v-col cols="10" classes="d-flex justify-content-start align-items-center">
                <input class="form-control form-mr-readonly" disabled readonly />
              </v-col>
            </v-row>
            <v-row classes="mt-5">
              <v-col cols="6" classes="d-flex justify-content-center align-items-center">
                <div class="signature-responsible">
                  Assinatura responsável
                </div>
              </v-col>
              <v-col cols="6" classes="d-flex justify-content-center align-items-center">
                <div class="signature-responsible">
                  Assinatura e carimbo do médico
                </div>
              </v-col>
            </v-row>
          </template>
        </card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
  .signature-responsible {
    margin-top: 30px;
    border-top: 2px solid #000000;
    padding-top: 10px;
    width: 75%;
    text-align: center;
  }

  .form-mr-readonly {
    background-color: #F3F3F3 !important;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }

  .w-40px {
    width: 40px;
  }
</style>