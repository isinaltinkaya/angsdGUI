import subprocess

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
    
    def setPath(self, path):
        if path.endswith('/'):
            path = path[:-1]
        self.path = path

    def create(self):
        with open(self.outFile,'w+') as f:
            f.write("#!/bin/bash\n\n")
            f.write("#Pipeline created by ANGSDgui.\n\n")
            f.write(self.path)
            f.close()

    def append(self, line): # append as a new line
        with open(self.outFile,'a+') as f:
            line = '\n\n'+ line
            f.write(line)
            f.close()
    
    def add(self, line): # add to line
        with open(self.outFile,'a+') as f:
            line = ' ' + line
            f.write(line)
            f.close()
    
    def getInput(self, input_filetype):
        fileTypeOpts= {'BAM':'-bam',
                      'CRAM':'-bam',
                      'mpileup':'-pileup',
                      'VCF':'-vcf-gl',
                      'BCF':'-vcf-gl',
                      'GLF':'-glf',
                      'beagle':'-beagle'}
        fileTypeOpt = fileTypeOpts[input_filetype]
        return fileTypeOpt
