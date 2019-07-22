import subprocess

#fileTypeOpts: {'BAM':'-bam',
#              'CRAM':'-bam',
#              'mpileup':'-pileup',
#              'VCF':'-vcf-gl',
#              'BCF':'-vcf-gl',
#              'GLF':'-glf',
#              'beagle':'-beagle'}

def get_input(input_filename,input_filetype):
    fileTypeOpts= {'BAM':'-bam',
                  'CRAM':'-bam',
                  'mpileup':'-pileup',
                  'VCF':'-vcf-gl',
                  'BCF':'-vcf-gl',
                  'GLF':'-glf',
                  'beagle':'-beagle'}
    fileTypeOpt = fileTypeOpts.get(input_filetype)

class WriteOutFile():
    def __init__(self,outFile):
        outFile = "pipelines/" + outFile + ".sh"
        self.outFile = outFile

    def create(self):
        with open(self.outFile,'w+') as File:
            File.close()

    def write(self, line):
        with open(self.outFile,'a+') as File:
            File.write(line)
            File.close()

