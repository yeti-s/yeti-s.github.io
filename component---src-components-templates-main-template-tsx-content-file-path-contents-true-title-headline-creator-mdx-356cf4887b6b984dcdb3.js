"use strict";(self.webpackChunkyeti_docs=self.webpackChunkyeti_docs||[]).push([[4],{3832:function(e,t,a){var n=a(4316),l=(a(7294),a(917));const m=(0,n.Z)("code",{target:"e1h9msy90"})({name:"15yct12",styles:"display:block;width:100%;padding:0.2rem 0.4rem 0rem;color:var(--comment-color)"});t.Z=e=>{let{children:t}=e;return(0,l.tZ)(m,null,t)}},7164:function(e,t,a){a.r(t),a.d(t,{default:function(){return D}});var n=a(1151),l=a(7294),m=a(3832);function r(e){const t=Object.assign({p:"p",h1:"h1",ul:"ul",li:"li",a:"a",br:"br",pre:"pre",code:"code",div:"div",span:"span",math:"math",semantics:"semantics",mrow:"mrow",mi:"mi",mo:"mo",mfrac:"mfrac",mtext:"mtext",annotation:"annotation",mn:"mn"},(0,n.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(t.p,null,"기사의 내용을 통해 새로운 제목을 생성해주는 모듈을 개발합니다."),"\n",l.createElement(t.h1,{id:"base-모델-선정"},"Base 모델 선정"),"\n",l.createElement(t.p,null,"높은 한국어 인식율을 위해 문서 요약 모델로 채택된 BART의 한국어 문장으로 pre-trained 모델을 찾아보았어요."),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://github.com/SKT-AI/KoBART"},"SKT-AI KoBART"),l.createElement(t.br),"\n","SKT에서 제공하는 KoBART는 여러가지 의존성을 추가로 설치해야해서 다른 모델을 더 찾아보고 결정하기로 할게요."),"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://huggingface.co/gogamza/kobart-base-v2"},"gogamza/kobart-base-v2"),l.createElement(t.br),"\n","찾아보니 SKT-AI KoBART와 동일한 모델이 이미 올라온 듯 하여 이를 사용하기로 했습니다."),"\n"),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-python"},"import torch\r\nfrom transformers import AutoTokenizer, AutoModelForSeq2SeqLM\r\nmodel_name = 'gogamza/kobart-base-v2'\r\n\r\n# get model, tokenizer\r\nmodel = AutoModelForSeq2SeqLM.from_pretrained(model_name)\r\ntokenizer = AutoTokenizer.from_pretrained(model_name)\n")),"\n",l.createElement(t.h1,{id:"dataset"},"Dataset"),"\n",l.createElement(t.p,null,"앞서 Detector 모듈을 학습하기 위해 만들었던 데이터를 그대로 활용할 생각이에요.\r\n기사의 내용을 input으로 주고 제목을 생성하도록 학습시킬 계획입니다.\r\n일단 모델의 프로토타입을 만드는 것이 우선이니, 제목과 본문정보 정도만 쓰는 것으로 하고 후에 메타 데이터를 활용할 수 있는지 추가로 분석하는 것으로 하자구요.\r\n매번 학습을 시작할 때 마다 json 데이터를 읽고 여러 전처리 과정을 거치는 것이 생각보다 시간이 오래 걸려 처리된 데이터를 저장하고 학습 마다 불러오는 것으로 설계할게요."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-python"},"import json\r\nfrom threading import Thread\r\nfrom datasets import Dataset\r\n\r\ncreates_dataset = True\r\ndataset_file = '../data/dataset1.pt'\r\ntrain_file = '../data/train_original.json' # num of total data is about 240000\r\nvalid_file = '../data/valid_original.json' # num of total data is about 30000\r\nnum_threads = 8\r\n\r\n# read json & tokenize\r\ndef get_input_and_labels(documents, articles, abstractives):\r\n    for document in documents:\r\n        article = ''\r\n        for text in document['text']:\r\n            if len(text) > 0:\r\n                article += (text[0]['sentence'] + ' ')\r\n        articles.append(article)\r\n        \r\n        abstractive = document['abstractive']\r\n        if len(abstractive) > 0:\r\n            abstractive = abstractive[0]\r\n        abstractives.append(abstractive)\r\n        \r\ndef get_dataset_from_json(json_file, num_data=0):\r\n    with open(json_file, 'r') as f:\r\n        json_data = json.load(f)\r\n        documents = json_data['documents']\r\n        data_size = len(documents)\r\n        if num_data == 0 or num_data > data_size:\r\n            num_data = data_size\r\n        \r\n        data_per_threads = num_data//num_threads\r\n        t_results = []\r\n        threads = []\r\n        for i in range(num_threads-1):\r\n            t_result = [[], []]\r\n            t_results.append(t_result)\r\n            \r\n            thread = Thread(target=get_input_and_labels, args=(documents[i*data_per_threads:(i+1)*data_per_threads], t_result[0], t_result[1],))\r\n            thread.daemon = True\r\n            thread.start()\r\n            threads.append(thread)\r\n            \r\n        data_dict = {'article':[], 'abstractive':[]}\r\n        get_input_and_labels(documents[(num_threads-1)*data_per_threads:], data_dict['article'], data_dict['abstractive'])\r\n\r\n        for thread in threads:\r\n            thread.join()\r\n        \r\n        for t_result in t_results:\r\n            data_dict['article'].extend(t_result[0])\r\n            data_dict['abstractive'].extend(t_result[1])\r\n            \r\n        return Dataset.from_dict(data_dict)\r\n\r\nif creates_dataset:\r\n    train_dataset = get_dataset_from_json(train_file)\r\n    val_dataset = get_dataset_from_json(valid_file)\n")),"\n",l.createElement(t.p,null,"batch 작업을 위해 모든 input을 동일한 BART 최대 길이인 1024로 설정하였어요.\r\n기사 내용을 토큰화 하였을 때 1024보다 커지는 경우는 거의 없더라구요.\r\n적절한 크기인 것 같습니다.\r\nlabel은 loss 계산 당시 동일한 input과 동일한 길이를 가져야 해서 똑같이 1024로 설정 해주겠습니다."),"\n",l.createElement(m.Z,null,l.createElement(t.p,null,"데이터를 토큰화까지 진행하고 저장하는 형식으로 만드려고 최대 길이 padding을 주었지만,\r\n하나의 batch로 묶인 데이터끼리만 padding을 주어 배치내 가장 큰 길이에 맞춰 padding하도록 해도 될듯")),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-python"},"from torch.utils.data import DataLoader, TensorDataset\r\n\r\nbatch_size = 4\r\n\r\ndef preprocess(examples):\r\n    inputs = tokenizer(examples['article'], return_tensors='pt', max_length=1024, padding='max_length', truncation=True)\r\n    labels = tokenizer(examples['abstractive'], return_tensors='pt', max_length=1024, padding='max_length', truncation=True)\r\n    inputs['labels'] = labels['input_ids']\r\n    return inputs\r\n\r\ndef create_dataloader(dataset):\r\n    input_ids = dataset['input_ids']\r\n    attention_mask = dataset['attention_mask']\r\n    labels = dataset['labels']\r\n    tensor_dataset = TensorDataset(input_ids, attention_mask, labels)\r\n    return DataLoader(tensor_dataset, batch_size=batch_size)\r\n\r\nif creates_dataset:\r\n    dataloader = {\r\n        'train': create_dataloader(train_dataset.map(preprocess, batched=True).with_format(\"torch\")),\r\n        'val': create_dataloader(val_dataset.map(preprocess, batched=True).with_format(\"torch\"))\r\n    }\r\n    torch.save(dataloader, dataset_file)\r\nelse:\r\n    dataloader = torch.load(dataset_file)\n")),"\n",l.createElement(t.h1,{id:"train"},"Train"),"\n",l.createElement(t.p,null,"validation dataset 자체도 약 30,000개 데이터로 이루어져 있어 평가 시간이 오래 걸리지만 더 정확한 측정을 위해 sampling은 하지 않는 것으로 하겠습니다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-python"},"# evaluate model\r\nfrom tqdm import tqdm\r\n\r\n@torch.no_grad()\r\ndef eval_model(model, val_dataloader):\r\n    device = next(model.parameters()).device\r\n    model.to(device)\r\n    model.eval()\r\n    total_loss = 0\r\n    \r\n    print('=== evaluate model')\r\n    for _, data in enumerate(tqdm(val_dataloader)):\r\n        data = [t.to(device) for t in data]\r\n        inputs = {\r\n            'input_ids': data[0],\r\n            'attention_mask': data[1],\r\n            'labels': data[2]\r\n        }\r\n        outputs =  model(**inputs)\r\n        loss = outputs.loss\r\n        total_loss += loss.item()\r\n    \r\n    total_loss /= len(val_dataloader)\r\n    print(f'total loss : {total_loss}')\r\n    \r\n    return total_loss\n")),"\n",l.createElement(t.p,null,"학습에는 epoch마다 선형적으로 learning rate를 감소시키는 scheduler를 사용할게요.",l.createElement(t.br),"\n","1 사이클 학습 하는데 하루가 걸려서 학습 중간에 checkpoint를 만들 필요가 있을 것 같아요.\r\n또한 ",l.createElement(t.code,null,"yolov8")," 모델에서 본 전략인데, 1 사이클마다 평가를 진행하고 가장 높은 점수를 받은 데이터를 best로 따로 저장해두는 전략을 사용합시다.",l.createElement(t.br),"\n","그리고 학습된 모델 weight를 직접 파일로 전달하지 않고 hub를 통해 접근 가능하도록 1 사이클이 끝날 때 마다 huggingface에 push하는 작업을 추가할게요."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-python"},"# train model\r\nimport os\r\nfrom torch.optim import AdamW, lr_scheduler\r\n\r\nclass Checkpoint():\r\n    def __init__(self, model, optimizer, scheduler) -> None:\r\n        self.model = model\r\n        self.optimizer = optimizer\r\n        self.scheduler = scheduler\r\n        self.epoch = 0\r\n        self.last_step = -1\r\n        self.best_loss = 1e20\r\n        \r\n    def set_root_dir(self, root_dir):\r\n        if root_dir is not None:\r\n            self.root_dir = root_dir\r\n            self.path = os.path.join(root_dir, 'checkpoint.pt')\r\n            \r\n            if not os.path.exists(root_dir):\r\n                os.makedirs(root_dir)\r\n                \r\n            if os.path.exists(self.path):\r\n                self.load(self.path)\r\n    \r\n    def load(self, save_path):\r\n        checkpoint = torch.load(save_path)\r\n        self.model.load_state_dict(checkpoint['model'])\r\n        self.optimizer.load_state_dict(checkpoint['optimizer'])\r\n        self.scheduler.load_state_dict(checkpoint['scheduler'])\r\n        self.epoch = checkpoint['epoch']\r\n        self.last_step = checkpoint['last_step']\r\n        self.best_loss = checkpoint['best_loss']\r\n    \r\n    def save(self):\r\n        if not self.path is None:\r\n            torch.save({\r\n                'model' : self.model.state_dict(),\r\n                'optimizer' : self.optimizer.state_dict(),\r\n                'scheduler' : self.scheduler.state_dict(),\r\n                'epoch' : self.epoch,\r\n                'last_step' : self.last_step,\r\n                'best_loss' : self.best_loss\r\n            }, self.path)\r\n        \r\n    def step(self):\r\n        self.optimizer.step()\r\n        self.last_step += 1\r\n    \r\n    def eval(self, val_dataloader):\r\n        if not self.root_dir is None:\r\n            loss = eval_model(self.model, val_dataloader)\r\n            if self.loss > loss:\r\n                self.loss = loss\r\n                torch.save(self.model.state_dict(), os.path.join(self.root_dir, 'best.pt'))\r\n    \r\n    def next(self):\r\n        self.scheduler.step()\r\n        self.epoch += 1\r\n        self.last_step = -1\r\n        self.save()\r\n        self.model.push_to_hub('yeti-s/kobart-base-v2-news-summarization', token=WRITE_TOKEN)\r\n        \r\n    def close(self):\r\n        if not self.path is None and os.path.exists(self.path):\r\n            os.remove(self.path)\r\n\r\n\r\ndef train_model(model, dataloader, checkpoint_dir=None, epochs=1, lr=2e-5, device=torch.device('cuda')):\r\n    model.to(device)\r\n    optimizer = AdamW(model.parameters(), lr=lr)\r\n    scheduler = lr_scheduler.LambdaLR(optimizer=optimizer, lr_lambda=lambda epoch:0.95**epoch)\r\n    checkpoint = Checkpoint(model, optimizer, scheduler)\r\n    checkpoint.set_root_dir(checkpoint_dir)\r\n\r\n    for epoch in range(checkpoint.epoch, epochs):\r\n        print(f'=== train model {epoch}/{epochs}')\r\n        model.train()\r\n        num_trained = 0\r\n        total_loss = 0\r\n        \r\n        for step, data in enumerate(tqdm(dataloader['train'])):\r\n            if step <= checkpoint.last_step:\r\n                continue\r\n            \r\n            data = [t.to(device) for t in data]\r\n            inputs = {\r\n                'input_ids': data[0],\r\n                'attention_mask': data[1],\r\n                'labels': data[2]\r\n            }\r\n\r\n            # get loss\r\n            optimizer.zero_grad()\r\n            outputs =  model(**inputs)\r\n            loss = outputs.loss\r\n            total_loss += loss.item()\r\n            \r\n            loss.backward()\r\n            checkpoint.step()\r\n            num_trained += 1\r\n            \r\n            # save checkpoint \r\n            if (step+1) % 1000 == 0:\r\n                checkpoint.save()\r\n                print(f'loss : {total_loss/num_trained}')\r\n        \r\n        checkpoint.eval(dataloader['val'])\r\n        checkpoint.next()\r\n        \r\n    # remove checkpoint\r\n    checkpoint.close()\n")),"\n",l.createElement(t.h1,{id:"evaluation"},"Evaluation"),"\n",l.createElement(t.p,null,"대표적인 텍스트 요약 모델의 성능 평가 지표인 ",l.createElement(t.code,null,"ROUGE(Recall-Oriented Understudy for Gisting Evaluation)")," 을 사용할게요.\r\nROUGE는 여기서 기사의 제목과 모델이 생성한 요약을 참고하여 점수르 매깁니다.\r\nRecall과 precision을 통해 점수를 측정하죠."),"\n",l.createElement(t.pre,null,l.createElement(t.code,null,"reference: the cat was under the bed\r\ngenerated: the cat was found under the bed\n")),"\n",l.createElement(t.p,null,"위와 같은 참조와 모델이 생성한 문장이 있다고 합시다."),"\n",l.createElement(t.div,{className:"math math-display"},l.createElement(t.span,{className:"katex-display"},l.createElement(t.span,{className:"katex"},l.createElement(t.span,{className:"katex-mathml"},l.createElement(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},l.createElement(t.semantics,null,l.createElement(t.mrow,null,l.createElement(t.mi,null,"R"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"c"),l.createElement(t.mi,null,"a"),l.createElement(t.mi,null,"l"),l.createElement(t.mi,null,"l"),l.createElement(t.mo,null,"="),l.createElement(t.mfrac,null,l.createElement(t.mrow,null,l.createElement(t.mi,null,"n"),l.createElement(t.mi,null,"u"),l.createElement(t.mi,null,"m"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"f"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"v"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"l"),l.createElement(t.mi,null,"a"),l.createElement(t.mi,null,"p"),l.createElement(t.mi,null,"p"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"d"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"w"),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"d"),l.createElement(t.mi,null,"s")),l.createElement(t.mrow,null,l.createElement(t.mi,null,"n"),l.createElement(t.mi,null,"u"),l.createElement(t.mi,null,"m"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"f"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"f"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"n"),l.createElement(t.mi,null,"c"),l.createElement(t.mi,null,"e"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"w"),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"d"),l.createElement(t.mi,null,"s")))),l.createElement(t.annotation,{encoding:"application/x-tex"},"Recall = \\frac{num\\;of\\;overlapped\\;words}{num\\;of\\;reference\\;words}")))),l.createElement(t.span,{className:"katex-html","aria-hidden":"true"},l.createElement(t.span,{className:"base"},l.createElement(t.span,{className:"strut",style:{height:"0.6944em"}}),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.00773em"}},"R"),l.createElement(t.span,{className:"mord mathnormal"},"ec"),l.createElement(t.span,{className:"mord mathnormal"},"a"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.01968em"}},"ll"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mrel"},"="),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}})),l.createElement(t.span,{className:"base"},l.createElement(t.span,{className:"strut",style:{height:"2.2519em",verticalAlign:"-0.8804em"}}),l.createElement(t.span,{className:"mord"},l.createElement(t.span,{className:"mopen nulldelimiter"}),l.createElement(t.span,{className:"mfrac"},l.createElement(t.span,{className:"vlist-t vlist-t2"},l.createElement(t.span,{className:"vlist-r"},l.createElement(t.span,{className:"vlist",style:{height:"1.3714em"}},l.createElement(t.span,{style:{top:"-2.314em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"mord"},l.createElement(t.span,{className:"mord mathnormal"},"n"),l.createElement(t.span,{className:"mord mathnormal"},"u"),l.createElement(t.span,{className:"mord mathnormal"},"m"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal"},"o"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal"},"re"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),l.createElement(t.span,{className:"mord mathnormal"},"ere"),l.createElement(t.span,{className:"mord mathnormal"},"n"),l.createElement(t.span,{className:"mord mathnormal"},"ce"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"}},"w"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"}},"or"),l.createElement(t.span,{className:"mord mathnormal"},"d"),l.createElement(t.span,{className:"mord mathnormal"},"s"))),l.createElement(t.span,{style:{top:"-3.23em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})),l.createElement(t.span,{style:{top:"-3.677em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"mord"},l.createElement(t.span,{className:"mord mathnormal"},"n"),l.createElement(t.span,{className:"mord mathnormal"},"u"),l.createElement(t.span,{className:"mord mathnormal"},"m"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal"},"o"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal"},"o"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"}},"v"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"}},"er"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),l.createElement(t.span,{className:"mord mathnormal"},"a"),l.createElement(t.span,{className:"mord mathnormal"},"pp"),l.createElement(t.span,{className:"mord mathnormal"},"e"),l.createElement(t.span,{className:"mord mathnormal"},"d"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"}},"w"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"}},"or"),l.createElement(t.span,{className:"mord mathnormal"},"d"),l.createElement(t.span,{className:"mord mathnormal"},"s")))),l.createElement(t.span,{className:"vlist-s"},"​")),l.createElement(t.span,{className:"vlist-r"},l.createElement(t.span,{className:"vlist",style:{height:"0.8804em"}},l.createElement(t.span))))),l.createElement(t.span,{className:"mclose nulldelimiter"}))))))),"\n",l.createElement(t.p,null,"위 예시에서는 ",l.createElement(t.span,{className:"math math-inline"},l.createElement(t.span,{className:"katex"},l.createElement(t.span,{className:"katex-mathml"},l.createElement(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML"},l.createElement(t.semantics,null,l.createElement(t.mrow,null,l.createElement(t.mfrac,null,l.createElement(t.mn,null,"6"),l.createElement(t.mn,null,"6"))),l.createElement(t.annotation,{encoding:"application/x-tex"},"\\frac{6}{6}")))),l.createElement(t.span,{className:"katex-html","aria-hidden":"true"},l.createElement(t.span,{className:"base"},l.createElement(t.span,{className:"strut",style:{height:"1.1901em",verticalAlign:"-0.345em"}}),l.createElement(t.span,{className:"mord"},l.createElement(t.span,{className:"mopen nulldelimiter"}),l.createElement(t.span,{className:"mfrac"},l.createElement(t.span,{className:"vlist-t vlist-t2"},l.createElement(t.span,{className:"vlist-r"},l.createElement(t.span,{className:"vlist",style:{height:"0.8451em"}},l.createElement(t.span,{style:{top:"-2.655em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"sizing reset-size6 size3 mtight"},l.createElement(t.span,{className:"mord mtight"},l.createElement(t.span,{className:"mord mtight"},"6")))),l.createElement(t.span,{style:{top:"-3.23em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})),l.createElement(t.span,{style:{top:"-3.394em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"sizing reset-size6 size3 mtight"},l.createElement(t.span,{className:"mord mtight"},l.createElement(t.span,{className:"mord mtight"},"6"))))),l.createElement(t.span,{className:"vlist-s"},"​")),l.createElement(t.span,{className:"vlist-r"},l.createElement(t.span,{className:"vlist",style:{height:"0.345em"}},l.createElement(t.span))))),l.createElement(t.span,{className:"mclose nulldelimiter"}))))))," 이 되겠죠.\r\n하지만 생성된 단어가 무척 길어서 중복될 단어의 수가 많으면 이 점수는 큰 의미를 가지지 못할 것입니다."),"\n",l.createElement(t.div,{className:"math math-display"},l.createElement(t.span,{className:"katex-display"},l.createElement(t.span,{className:"katex"},l.createElement(t.span,{className:"katex-mathml"},l.createElement(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},l.createElement(t.semantics,null,l.createElement(t.mrow,null,l.createElement(t.mi,null,"P"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"c"),l.createElement(t.mi,null,"i"),l.createElement(t.mi,null,"s"),l.createElement(t.mi,null,"i"),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"n"),l.createElement(t.mo,null,"="),l.createElement(t.mfrac,null,l.createElement(t.mrow,null,l.createElement(t.mi,null,"n"),l.createElement(t.mi,null,"u"),l.createElement(t.mi,null,"m"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"f"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"v"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"l"),l.createElement(t.mi,null,"a"),l.createElement(t.mi,null,"p"),l.createElement(t.mi,null,"p"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"d"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"w"),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"d"),l.createElement(t.mi,null,"s")),l.createElement(t.mrow,null,l.createElement(t.mi,null,"n"),l.createElement(t.mi,null,"u"),l.createElement(t.mi,null,"m"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"f"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"g"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"n"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"a"),l.createElement(t.mi,null,"t"),l.createElement(t.mi,null,"e"),l.createElement(t.mi,null,"d"),l.createElement(t.mtext,null,"  "),l.createElement(t.mi,null,"w"),l.createElement(t.mi,null,"o"),l.createElement(t.mi,null,"r"),l.createElement(t.mi,null,"d"),l.createElement(t.mi,null,"s")))),l.createElement(t.annotation,{encoding:"application/x-tex"},"Precision = \\frac{num\\;of\\;overlapped\\;words}{num\\;of\\;generated\\;words}")))),l.createElement(t.span,{className:"katex-html","aria-hidden":"true"},l.createElement(t.span,{className:"base"},l.createElement(t.span,{className:"strut",style:{height:"0.6833em"}}),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.13889em"}},"P"),l.createElement(t.span,{className:"mord mathnormal"},"rec"),l.createElement(t.span,{className:"mord mathnormal"},"i"),l.createElement(t.span,{className:"mord mathnormal"},"s"),l.createElement(t.span,{className:"mord mathnormal"},"i"),l.createElement(t.span,{className:"mord mathnormal"},"o"),l.createElement(t.span,{className:"mord mathnormal"},"n"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mrel"},"="),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}})),l.createElement(t.span,{className:"base"},l.createElement(t.span,{className:"strut",style:{height:"2.2519em",verticalAlign:"-0.8804em"}}),l.createElement(t.span,{className:"mord"},l.createElement(t.span,{className:"mopen nulldelimiter"}),l.createElement(t.span,{className:"mfrac"},l.createElement(t.span,{className:"vlist-t vlist-t2"},l.createElement(t.span,{className:"vlist-r"},l.createElement(t.span,{className:"vlist",style:{height:"1.3714em"}},l.createElement(t.span,{style:{top:"-2.314em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"mord"},l.createElement(t.span,{className:"mord mathnormal"},"n"),l.createElement(t.span,{className:"mord mathnormal"},"u"),l.createElement(t.span,{className:"mord mathnormal"},"m"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal"},"o"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"}},"g"),l.createElement(t.span,{className:"mord mathnormal"},"e"),l.createElement(t.span,{className:"mord mathnormal"},"n"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"}},"er"),l.createElement(t.span,{className:"mord mathnormal"},"a"),l.createElement(t.span,{className:"mord mathnormal"},"t"),l.createElement(t.span,{className:"mord mathnormal"},"e"),l.createElement(t.span,{className:"mord mathnormal"},"d"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"}},"w"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"}},"or"),l.createElement(t.span,{className:"mord mathnormal"},"d"),l.createElement(t.span,{className:"mord mathnormal"},"s"))),l.createElement(t.span,{style:{top:"-3.23em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})),l.createElement(t.span,{style:{top:"-3.677em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"mord"},l.createElement(t.span,{className:"mord mathnormal"},"n"),l.createElement(t.span,{className:"mord mathnormal"},"u"),l.createElement(t.span,{className:"mord mathnormal"},"m"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal"},"o"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal"},"o"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"}},"v"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"}},"er"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),l.createElement(t.span,{className:"mord mathnormal"},"a"),l.createElement(t.span,{className:"mord mathnormal"},"pp"),l.createElement(t.span,{className:"mord mathnormal"},"e"),l.createElement(t.span,{className:"mord mathnormal"},"d"),l.createElement(t.span,{className:"mspace",style:{marginRight:"0.2778em"}}),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"}},"w"),l.createElement(t.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"}},"or"),l.createElement(t.span,{className:"mord mathnormal"},"d"),l.createElement(t.span,{className:"mord mathnormal"},"s")))),l.createElement(t.span,{className:"vlist-s"},"​")),l.createElement(t.span,{className:"vlist-r"},l.createElement(t.span,{className:"vlist",style:{height:"0.8804em"}},l.createElement(t.span))))),l.createElement(t.span,{className:"mclose nulldelimiter"}))))))),"\n",l.createElement(t.p,null,"위 예시에서 precision은 ",l.createElement(t.span,{className:"math math-inline"},l.createElement(t.span,{className:"katex"},l.createElement(t.span,{className:"katex-mathml"},l.createElement(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML"},l.createElement(t.semantics,null,l.createElement(t.mrow,null,l.createElement(t.mfrac,null,l.createElement(t.mn,null,"6"),l.createElement(t.mn,null,"7"))),l.createElement(t.annotation,{encoding:"application/x-tex"},"\\frac{6}{7}")))),l.createElement(t.span,{className:"katex-html","aria-hidden":"true"},l.createElement(t.span,{className:"base"},l.createElement(t.span,{className:"strut",style:{height:"1.1901em",verticalAlign:"-0.345em"}}),l.createElement(t.span,{className:"mord"},l.createElement(t.span,{className:"mopen nulldelimiter"}),l.createElement(t.span,{className:"mfrac"},l.createElement(t.span,{className:"vlist-t vlist-t2"},l.createElement(t.span,{className:"vlist-r"},l.createElement(t.span,{className:"vlist",style:{height:"0.8451em"}},l.createElement(t.span,{style:{top:"-2.655em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"sizing reset-size6 size3 mtight"},l.createElement(t.span,{className:"mord mtight"},l.createElement(t.span,{className:"mord mtight"},"7")))),l.createElement(t.span,{style:{top:"-3.23em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})),l.createElement(t.span,{style:{top:"-3.394em"}},l.createElement(t.span,{className:"pstrut",style:{height:"3em"}}),l.createElement(t.span,{className:"sizing reset-size6 size3 mtight"},l.createElement(t.span,{className:"mord mtight"},l.createElement(t.span,{className:"mord mtight"},"6"))))),l.createElement(t.span,{className:"vlist-s"},"​")),l.createElement(t.span,{className:"vlist-r"},l.createElement(t.span,{className:"vlist",style:{height:"0.345em"}},l.createElement(t.span))))),l.createElement(t.span,{className:"mclose nulldelimiter"})))))),"이 되겠죠.\r\n이는 생성된 문장에 불필요한 단어들이 생성될수록 점수가 더 낮게 계산됩니다.\r\n하지만 생성된 문장이 매우 짧아지면 점수가 크게 나오는 현상이 발생할 것이에요.\r\n그래서 우리는 두 점수를 모두 사용한 F1 score를 이용하여 더 정확한 점수를 계산해야 합니다."),"\n",l.createElement(t.p,null,"위 예시는 ROUGE-1 즉, 한 단어마다 중복되는 수를 비교하였다면 ROUGE-N은 N개의 단어 조합으로 중복을 확인합니다.\r\nROUGE-2를 예로 들어볼게요."),"\n",l.createElement(t.pre,null,l.createElement(t.code,null,"ref bigrams: the cat, cat was, was found, found under, under the, the bed\r\ngen bigrams: the cat, cat was, was under, under the, the, bed\n")),"\n",l.createElement(t.p,null,"위와 같은 bigram들을 생성한 후 앞선 방식과 같이 점수를 측정하는 것이죠."),"\n",l.createElement(t.p,null,"ROUGE-L과 ROUGE-S 등 다양한 방법이 있는데 일단 나중에 정리하고 위 모델의 성능을 측정하도록 하겠습니다."),"\n",l.createElement(t.pre,null,l.createElement(t.code,null,"Recall\t    Precision\tF1-score\r\n30.98\t    35.53\t    32.42   ROUGE-1\r\n12.30\t    14.58\t    13.00   ROUGE-2\r\n29.65\t    34.10\t    31.06   ROUGE-L\n")),"\n",l.createElement(t.p,null,"사실 한국어는 '-은/는, -이/가, -에' 와 같은 조사로 인해 같은 의미의 단어라도 여라가지 모양을 띄고 있어요.\r\n그래서 단순 단어를 이용한 중복 비교하는 방식은 다른 언어에 비해 보다 낮은 점수를 보일 수 있습니다.\r\n그래서 더 정확한 측정을 위해서는 다른 방법이 필요할 것 같아요."),"\n",l.createElement(t.p,null,"더 나은 측정을 위해 ",l.createElement(t.code,null,"ROUGE-U"),", ",l.createElement(t.code,null,"ROUGE-SU"),", ",l.createElement(t.code,null,"RDASS")," 와 같은 방식을 살펴봅시다."))}var s=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?l.createElement(t,e,l.createElement(r,e)):r(e)},c=a(4316),i=a(1840),o=a(7821),d=a(2654),p=a(4111),E=a(2726),h=a(4480),u=a(2818),g=a(9213),N=a(7213),f=a(9265),_=a(9601),v=a(3071),y=a(6097),b=a(6782),w=a(4891),x=a(3387),R=a(917);const k=e=>{let{data:{mdx:t,file:a},children:m}=e;const r=(0,h.sJ)((0,u.cp)(u.eE,!1)),s=(0,h.sJ)((0,u.cp)(u.rf,!1)),c=(0,h.Zl)((0,u.cp)(u.Cy,t.tableOfContents.items));return(0,l.useEffect)((()=>{c(t.tableOfContents.items)}),[t]),(0,R.tZ)(i.Z,null,(0,R.tZ)(z,null,(0,R.tZ)(p.Z,null)),(0,R.tZ)(Z,null,(0,R.tZ)(j,{className:"navigation",isNavOpened:s},(0,R.tZ)(T,{className:"hide_scroll"},(0,R.tZ)(o.Z,null))),(0,R.tZ)(O,{isNavOpened:s},(0,R.tZ)(A,{isWide:r},(0,R.tZ)(E.Z,{title:t.frontmatter.title,modifiedTime:a.modifiedTime}),(0,R.tZ)(n.Zo,{components:{p:N.Z,h1:f.H1,h2:f.H2,h3:f.H3,h4:f.H4,h5:f.H5,h6:f.H6,hr:_.Z,blockquote:v.Z,ul:b.Z,ol:y.Z,pre:w.Z,code:x.Z}},m))),(0,R.tZ)(M,null,(0,R.tZ)(U,null,(0,R.tZ)(d.Z,null)))))},z=(0,c.Z)("div",{target:"e1ojob7j7"})({name:"11t2x7x",styles:"display:flex;height:var(--header-height);z-index:5;padding:0.6rem 2rem 0.6rem 0.6rem;position:fixed;width:100%;background:var(--background-color);border-bottom:1px solid var(--border-color)"}),Z=(0,c.Z)("div",{target:"e1ojob7j6"})({name:"majwgz",styles:"position:relative;display:flex;min-height:calc(100vh - var(--header-height));overflow-x:hidden"}),j=(0,c.Z)("aside",{target:"e1ojob7j5"})("margin-left:",(e=>e.isNavOpened?"0":"calc(-1 * var(--sidebar-width))"),";flex:0 0 var(--sidebar-width);font-size:0.875rem;overflow-x:hidden;overflow-y:auto;transition:margin 0.25s var(--ease-in-out-quad);@media (min-width: ",g.Z.IPAD_PRO,"px){margin-left:0;}"),T=(0,c.Z)("nav",{target:"e1ojob7j4"})({name:"l4vzaw",styles:"overflow-y:auto;height:100%;padding:var(--body-padding-top) 0 3rem 0;position:fixed;width:var(--sidebar-width);&:-webkit-scrollbar{display:none;}"}),A=(0,c.Z)("main",{target:"e1ojob7j3"})("padding:1rem;width:100%;@media (min-width: ",g.Z.IPAD_AIR,"px){width:",(e=>e.isWide?"90%":"65%"),";}"),O=(0,c.Z)("main",{target:"e1ojob7j2"})("width:calc(100% - 2 * var(--sidebar-width));padding-top:var(--body-padding-top);flex-grow:1;min-width:20rem;display:flex;justify-content:center;opacity:",(e=>e.isNavOpened?.3:1),";@media (min-width: ",g.Z.IPAD_PRO,"px){opacity:1;}"),M=(0,c.Z)("aside",{target:"e1ojob7j1"})("font-size:0.75rem;font-weight:bold;overflow-x:hidden;overflow-y:auto;padding-top:var(--body-padding-top);width:0;transition:width 0.25s var(--ease-in-out-quad);@media (min-width: ",g.Z.HD,"px){width:var(--sidebar-width);}"),U=(0,c.Z)(T,{target:"e1ojob7j0"})({name:"b40oxt",styles:"padding:0 1rem 0 1rem"});function D(e){return l.createElement(k,e,l.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-components-templates-main-template-tsx-content-file-path-contents-true-title-headline-creator-mdx-356cf4887b6b984dcdb3.js.map