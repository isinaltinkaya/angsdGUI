import subprocess

#fileTypeOpts: {'BAM':'-bam',
#              'CRAM':'-bam',
#              'mpileup':'-pileup',
#              'VCF':'-vcf-gl',
#              'BCF':'-vcf-gl',
#              'GLF':'-glf',
#              'beagle':'-beagle'}

def touch_outFile(pipeline_name="ANGSD_pipeline"):
    global outFile
    outFile = "pipeline/" + pipeline_name + ".sh"
    subprocess.call(['touch', outFile])

def get_input(input_filename,input_filetype):
    fileTypeOpts= {'BAM':'-bam',
                  'CRAM':'-bam',
                  'mpileup':'-pileup',
                  'VCF':'-vcf-gl',
                  'BCF':'-vcf-gl',
                  'GLF':'-glf',
                  'beagle':'-beagle'}
    fileTypeOpt = fileTypeOpts.get(input_filetype)
    global outFile
    subprocess.call(["echo", "Hello","World!"])
